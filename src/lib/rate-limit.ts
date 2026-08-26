type RateLimitOptions = {
  key: string;
  limit: number;
  windowSeconds: number;
};

type MemoryBucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();

async function upstashLimit({ key, limit, windowSeconds }: RateLimitOptions) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const redisKey = `portfolio:rate:${key}`;
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, windowSeconds]
    ]),
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as Array<{ result: number }>;
  const count = data[0]?.result ?? 1;

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: Date.now() + windowSeconds * 1000
  };
}

function memoryLimit({ key, limit, windowSeconds }: RateLimitOptions) {
  const now = Date.now();
  const resetAt = now + windowSeconds * 1000;
  const current = memoryBuckets.get(key);

  if (!current || current.resetAt < now) {
    memoryBuckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, reset: resetAt };
  }

  current.count += 1;
  memoryBuckets.set(key, current);

  return {
    success: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    reset: current.resetAt
  };
}

export async function rateLimit(options: RateLimitOptions) {
  const distributed = await upstashLimit(options);
  return distributed ?? memoryLimit(options);
}

export async function assertRateLimit(options: RateLimitOptions) {
  const result = await rateLimit(options);

  if (!result.success) {
    throw new Error("Too many requests. Please try again shortly.");
  }

  return result;
}
