"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(state.fieldErrors?.name)} aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} />
          {state.fieldErrors?.name?.[0] ? <p id="name-error" className="text-body-small text-danger">{state.fieldErrors.name[0]}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} aria-describedby={state.fieldErrors?.email ? "email-error" : undefined} />
          {state.fieldErrors?.email?.[0] ? <p id="email-error" className="text-body-small text-danger">{state.fieldErrors.email[0]}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" aria-invalid={Boolean(state.fieldErrors?.company)} aria-describedby={state.fieldErrors?.company ? "company-error" : undefined} />
        {state.fieldErrors?.company?.[0] ? <p id="company-error" className="text-body-small text-danger">{state.fieldErrors.company[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required aria-invalid={Boolean(state.fieldErrors?.message)} aria-describedby={state.fieldErrors?.message ? "message-error" : undefined} />
        {state.fieldErrors?.message?.[0] ? <p id="message-error" className="text-body-small text-danger">{state.fieldErrors.message[0]}</p> : null}
      </div>

      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
      />

      {state.message ? (
        <p role={state.ok ? "status" : "alert"} aria-live={state.ok ? "polite" : "assertive"} className={state.ok ? "text-body-small text-accent" : "text-body-small text-danger"}>
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        <Send aria-hidden="true" className="size-4" />
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
