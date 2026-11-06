import { MessagesList } from "@/components/admin/messages-list";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100
  });

  return (
    <div className="mx-auto max-w-6xl w-full min-w-0">
      <p className="font-mono text-metadata uppercase text-accent">Messages</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Contact inbox</h1>

      <div className="mt-8">
        <MessagesList messages={messages} />
      </div>
    </div>
  );
}
