"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import { sendContactMessage, type ContactState } from "@/lib/actions/contact-actions";

const initialState: ContactState = {
  ok: false
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-copy">Name</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(state.fieldErrors?.name)} aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} className="focus-ring h-11 w-full rounded-[6px] border border-rule bg-surface px-3 text-sm text-copy placeholder:text-muted transition hover:border-muted" />
          {state.fieldErrors?.name?.[0] ? <p id="name-error" className="text-sm text-red-300">{state.fieldErrors.name[0]}</p> : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-copy">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} aria-describedby={state.fieldErrors?.email ? "email-error" : undefined} className="focus-ring h-11 w-full rounded-[6px] border border-rule bg-surface px-3 text-sm text-copy placeholder:text-muted transition hover:border-muted" />
          {state.fieldErrors?.email?.[0] ? <p id="email-error" className="text-sm text-red-300">{state.fieldErrors.email[0]}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-copy">Company</label>
        <input id="company" name="company" autoComplete="organization" aria-invalid={Boolean(state.fieldErrors?.company)} aria-describedby={state.fieldErrors?.company ? "company-error" : undefined} className="focus-ring h-11 w-full rounded-[6px] border border-rule bg-surface px-3 text-sm text-copy placeholder:text-muted transition hover:border-muted" />
        {state.fieldErrors?.company?.[0] ? <p id="company-error" className="text-sm text-red-300">{state.fieldErrors.company[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-copy">Message</label>
        <textarea id="message" name="message" required aria-invalid={Boolean(state.fieldErrors?.message)} aria-describedby={state.fieldErrors?.message ? "message-error" : undefined} className="focus-ring min-h-36 w-full resize-y rounded-[6px] border border-rule bg-surface px-3 py-3 text-sm text-copy placeholder:text-muted transition hover:border-muted" />
        {state.fieldErrors?.message?.[0] ? <p id="message-error" className="text-sm text-red-300">{state.fieldErrors.message[0]}</p> : null}
      </div>

      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
      />

      {state.message ? (
        <p role={state.ok ? "status" : "alert"} aria-live={state.ok ? "polite" : "assertive"} className={state.ok ? "text-sm text-accent" : "text-sm text-red-300"}>
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-accent bg-[var(--color-accent)] px-5 text-sm font-medium text-canvas transition duration-200 ease-out hover:border-white hover:bg-white active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
        <Send aria-hidden="true" className="size-4" />
        {pending ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
