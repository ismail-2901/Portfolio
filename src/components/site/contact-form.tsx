"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import { sendContactMessage, type ContactState } from "@/lib/actions/contact-actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactState = {
  ok: false
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-lg border border-white/10 bg-zinc-900/60 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
          <FieldError>{state.fieldErrors?.name?.[0]}</FieldError>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
          <FieldError>{state.fieldErrors?.email?.[0]}</FieldError>
        </Field>
      </div>

      <Field>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" />
        <FieldError>{state.fieldErrors?.company?.[0]}</FieldError>
      </Field>

      <Field>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
        <FieldError>{state.fieldErrors?.message?.[0]}</FieldError>
      </Field>

      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
      />

      {state.message ? (
        <p className={state.ok ? "text-sm text-emerald-300" : "text-sm text-red-300"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending}>
        <Send aria-hidden="true" className="size-4" />
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
