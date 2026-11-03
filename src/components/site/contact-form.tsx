"use client";

import { useActionState, useEffect, useRef, type FormEvent } from "react";
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
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const submissionLockRef = useRef(false);
  const fieldErrors = state.fieldErrors ?? {};
  const invalidFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "company", label: "Company" },
    { name: "message", label: "Message" }
  ].filter(({ name }) => Boolean(fieldErrors[name]?.length));
  const hasFieldErrors = invalidFields.length > 0;

  useEffect(() => {
    submissionLockRef.current = pending;
  }, [pending]);

  useEffect(() => {
    if (hasFieldErrors) {
      errorSummaryRef.current?.focus();
    }
  }, [hasFieldErrors, state.fieldErrors]);

  function preventDuplicateSubmit(event: FormEvent<HTMLFormElement>) {
    if (submissionLockRef.current || pending) {
      event.preventDefault();
      return;
    }

    submissionLockRef.current = true;
  }

  return (
    <form action={formAction} onSubmit={preventDuplicateSubmit} className="space-y-5" aria-busy={pending}>
      <p className="text-body-small text-muted">Fields marked with an asterisk (<span aria-hidden="true" className="text-accent">*</span>) are required.</p>
      {hasFieldErrors ? (
        <div
          ref={errorSummaryRef}
          id="contact-error-summary"
          role="alert"
          aria-labelledby="contact-error-title"
          tabIndex={-1}
          className="focus-ring border-l-2 border-danger pl-4 text-body-small text-danger"
        >
          <h3 id="contact-error-title" className="font-medium text-danger-strong">There is a problem with your message</h3>
          <p className="mt-1">{state.message}</p>
          <ul className="mt-2 list-inside list-disc">
            {invalidFields.map(({ name, label }) => (
              <li key={name}>
                <a className="focus-ring underline underline-offset-2" href={`#${name}`}>
                  {label}: {fieldErrors[name]?.[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : state.message ? (
        <p role={state.ok ? "status" : "alert"} className={state.ok ? "text-body-small text-accent" : "text-body-small text-danger"}>
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name <span aria-hidden="true" className="text-accent">*</span></Label>
          <Input id="name" name="name" autoComplete="name" required defaultValue={state.values?.name ?? ""} aria-invalid={fieldErrors.name?.length ? true : undefined} aria-describedby={fieldErrors.name?.length ? "name-error" : undefined} />
          {fieldErrors.name?.[0] ? <p id="name-error" className="text-body-small text-danger">{fieldErrors.name[0]}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email <span aria-hidden="true" className="text-accent">*</span></Label>
          <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={state.values?.email ?? ""} aria-invalid={fieldErrors.email?.length ? true : undefined} aria-describedby={fieldErrors.email?.length ? "email-error" : undefined} />
          {fieldErrors.email?.[0] ? <p id="email-error" className="text-body-small text-danger">{fieldErrors.email[0]}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company <span className="text-muted">(optional)</span></Label>
        <Input id="company" name="company" autoComplete="organization" defaultValue={state.values?.company ?? ""} aria-invalid={fieldErrors.company?.length ? true : undefined} aria-describedby={fieldErrors.company?.length ? "company-error" : undefined} />
        {fieldErrors.company?.[0] ? <p id="company-error" className="text-body-small text-danger">{fieldErrors.company[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message <span aria-hidden="true" className="text-accent">*</span></Label>
        <Textarea id="message" name="message" required defaultValue={state.values?.message ?? ""} aria-invalid={fieldErrors.message?.length ? true : undefined} aria-describedby={fieldErrors.message?.length ? "message-error" : undefined} />
        {fieldErrors.message?.[0] ? <p id="message-error" className="text-body-small text-danger">{fieldErrors.message[0]}</p> : null}
      </div>

      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
      />

      <p className="sr-only" role="status" aria-live="polite">{pending ? "Sending your message." : ""}</p>

      <Button type="submit" disabled={pending} aria-busy={pending}>
        <Send aria-hidden="true" className="size-4" />
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
