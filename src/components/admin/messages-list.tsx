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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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

      <div className="grid gap-3">
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
              className={`rounded-panel border transition-colors ${
                !message.readAt
                  ? "border-accent/40 bg-surface-raised/90"
                  : "border-rule bg-surface-raised"
              }`}
            >
              {/* Card Header (clickable to expand/collapse) */}
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
                className="p-4 sm:p-5 cursor-pointer select-none flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!message.readAt ? (
                      <Badge className="border-accent/30 text-accent text-[10px] py-0 px-2">Unread</Badge>
                    ) : null}
                    {message.company ? (
                      <Badge className="text-[10px] py-0 px-2">{message.company}</Badge>
                    ) : null}
                    <span className="text-[11px] text-muted">{formattedDate}</span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <h2 className="text-subheading font-semibold text-copy truncate">{message.name}</h2>
                    <span className="text-xs text-muted truncate">({message.email})</span>
                  </div>

                  {/* One-line preview when collapsed */}
                  {!isExpanded && (
                    <p className="mt-1 text-xs text-muted line-clamp-1 truncate">
                      {message.message}
                    </p>
                  )}
                </div>

                {/* Actions & Chevron */}
                <div
                  className="flex items-center gap-2 self-end md:self-center shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!message.readAt ? (
                    <form action={markMessageReadAction.bind(null, message.id)}>
                      <SubmitButton
                        variant="secondary"
                        className="h-8 px-3 text-xs"
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
                      className="h-8 px-3 text-xs"
                      pendingLabel="Deleting"
                    >
                      <Trash2 aria-hidden="true" className="size-3.5 mr-1" />
                      Delete
                    </SubmitButton>
                  </form>
                  <Button
                    type="button"
                    variant="ghost"
                    className="size-8 p-0 text-muted hover:text-copy"
                    onClick={() => toggle(message.id)}
                    aria-label={isExpanded ? "Collapse message" : "Expand message"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="border-t border-rule/60 p-4 sm:p-5 bg-surface/50">
                  <p className="whitespace-pre-wrap text-body text-copy-soft leading-relaxed">
                    {message.message}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
