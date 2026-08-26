"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";

import { loginAction, type LoginState } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {
  ok: false
};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="glass-panel w-full max-w-md rounded-lg p-6">
      <div>
        <p className="font-mono text-sm uppercase text-cyan-300">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-50">Secure dashboard login</h1>
      </div>

      <div className="mt-8 space-y-5">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </Field>
      </div>

      {state.message ? <p className="mt-5 text-sm text-red-300">{state.message}</p> : null}

      <Button type="submit" disabled={pending} className="mt-6 w-full">
        <LogIn aria-hidden="true" className="size-4" />
        {pending ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}
