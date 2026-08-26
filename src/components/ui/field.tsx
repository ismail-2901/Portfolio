import { cn } from "@/lib/utils";

export function Field({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) {
    return null;
  }

  return <p className="text-sm text-red-300">{children}</p>;
}
