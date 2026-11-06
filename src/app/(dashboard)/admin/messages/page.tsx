import { Check, Trash2 } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Badge } from "@/components/ui/badge";
import { deleteMessageAction, markMessageReadAction } from "@/lib/actions/message-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100
  });

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Messages</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Contact inbox</h1>

      <div className="mt-8 grid gap-4">
        {messages.length === 0 ? (
          <div className="rounded-panel border border-rule bg-surface-raised p-8 text-center">
            <p className="text-body text-muted">No messages received yet.</p>
          </div>
        ) : (
          messages.map((message) => (
            <article key={message.id} className="rounded-panel border border-rule bg-surface-raised p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {!message.readAt ? <Badge className="border-accent/30 text-accent">Unread</Badge> : null}
                    {message.company ? <Badge>{message.company}</Badge> : null}
                  </div>
                  <h2 className="mt-4 text-subheading font-semibold text-copy">{message.name}</h2>
                  <p className="mt-1 text-body-small text-muted">{message.email}</p>
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
                  <form action={deleteMessageAction.bind(null, message.id)}>
                    <SubmitButton variant="danger" pendingLabel="Deleting">
                      <Trash2 aria-hidden="true" className="size-4" />
                      Delete
                    </SubmitButton>
                  </form>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-body text-copy-soft">{message.message}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
