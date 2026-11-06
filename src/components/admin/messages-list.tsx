"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteMessageAction, markMessageReadAction } from "@/lib/actions/message-actions";

export type MessageItem = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  readAt: Date | string | null;
  createdAt: Date | string;
};

export function MessagesList({ messages }: { messages: MessageItem[] }) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    messages.forEach((m) => {
      all[m.id] = true;
    });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  if (messages.length === 0) {
    return (
      <div className="rounded-panel border border-rule bg-surface-raised p-8 text-center">
        <p className="text-body text-muted">No messages received yet.</p>
      </div>
    );
  }

  const allExpanded = messages.length > 0 && messages.every((m) => expandedIds[m.id]);

  return (
    <div className="w-full max-w-full space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted">
          Showing {messages.length} {messages.length === 1 ? "message" : "messages"}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="h-8 px-2 text-xs text-muted hover:text-copy"
          onClick={allExpanded ? collapseAll : expandAll}
        >
          {allExpanded ? (
            <>
              <ChevronUp className="size-3.5 mr-1" /> Collapse all
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5 mr-1" /> Expand all
            </>
          )}
        </Button>
      </div>

      <div className="grid w-full max-w-full gap-3">
        {messages.map((message) => {
          const isExpanded = !!expandedIds[message.id];
          const formattedDate = new Date(message.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          });

          return (
            <article
              key={message.id}
              className={`w-full max-w-full overflow-hidden rounded-panel border transition-colors ${
                !message.readAt
                  ? "border-accent/40 bg-surface-raised/90"
                  : "border-rule bg-surface-raised"
              }`}
            >
              <div className="p-4 sm:p-5">
                {/* Header row: Sender details and Action buttons */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {!message.readAt ? (
                        <Badge className="border-accent/30 text-accent text-[10px] py-0 px-2 shrink-0">
                          Unread
                        </Badge>
                      ) : null}
                      {message.company ? (
                        <Badge className="text-[10px] py-0 px-2 shrink-0">
                          {message.company}
                        </Badge>
                      ) : null}
                      <span className="text-[11px] text-muted shrink-0">{formattedDate}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h2 className="text-subheading font-semibold text-copy break-words">
                        {message.name}
                      </h2>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-xs text-muted hover:text-accent break-all transition-colors"
                      >
                        {message.email}
                      </a>
                    </div>
                  </div>

                  {/* Actions & Expand Toggle */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!message.readAt ? (
                      <form action={markMessageReadAction.bind(null, message.id)}>
                        <SubmitButton
                          variant="secondary"
                          className="h-8 px-2.5 text-xs"
                          pendingLabel="Marking"
                        >
                          <Check aria-hidden="true" className="size-3.5 mr-1" />
                          Read
                        </SubmitButton>
                      </form>
                    ) : null}
                    <form action={deleteMessageAction.bind(null, message.id)}>
                      <SubmitButton
                        variant="danger"
                        className="h-8 px-2.5 text-xs"
                        pendingLabel="Deleting"
                      >
                        <Trash2 aria-hidden="true" className="size-3.5 mr-1" />
                        Delete
                      </SubmitButton>
                    </form>
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-8 px-2.5 text-xs text-muted hover:text-copy"
                      onClick={() => toggle(message.id)}
                      aria-label={isExpanded ? "Collapse message" : "Expand message"}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="size-3.5 sm:mr-1" />
                          <span className="hidden sm:inline">Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-3.5 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Collapsed Preview vs Full Expanded Message */}
                {isExpanded ? (
                  <div className="mt-4 pt-4 border-t border-rule/60">
                    <p className="whitespace-pre-wrap text-body text-copy-soft leading-relaxed break-words">
                      {message.message}
                    </p>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggle(message.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(message.id);
                      }
                    }}
                    className="mt-3 cursor-pointer group select-none"
                  >
                    <p className="text-body-small text-muted line-clamp-2 break-words group-hover:text-copy transition-colors">
                      {message.message}
                    </p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
