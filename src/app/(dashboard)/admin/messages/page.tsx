import { Archive, Check } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Badge } from "@/components/ui/badge";
import { archiveMessageAction, markMessageReadAction } from "@/lib/actions/message-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100
  });

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Messages</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Contact inbox</h1>

      <div className="mt-8 grid gap-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-lg border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  {!message.readAt ? <Badge className="border-cyan-300/30 text-cyan-200">Unread</Badge> : null}
                  {message.archivedAt ? <Badge>Archived</Badge> : null}
                  {message.company ? <Badge>{message.company}</Badge> : null}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-zinc-50">{message.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">{message.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!message.readAt ? (
                  <form action={markMessageReadAction.bind(null, message.id)}>
                    <SubmitButton variant="secondary" pendingLabel="Marking">
                      <Check aria-hidden="true" className="size-4" />
                      Read
                    </SubmitButton>
                  </form>
                ) : null}
                {!message.archivedAt ? (
                  <form action={archiveMessageAction.bind(null, message.id)}>
                    <SubmitButton variant="secondary" pendingLabel="Archiving">
                      <Archive aria-hidden="true" className="size-4" />
                      Archive
                    </SubmitButton>
                  </form>
                ) : null}
              </div>
            </div>
            <p className="mt-5 whitespace-pre-wrap leading-7 text-zinc-300">{message.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
