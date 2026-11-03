"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="glass-panel w-full max-w-md rounded-panel p-6">
      <div>
        <p className="font-mono text-metadata uppercase text-accent">Admin</p>
        <h1 className="mt-3 text-heading font-semibold text-copy">Secure dashboard login</h1>
      </div>

      <div className="mt-8 space-y-5">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="pr-12"
              required
            />
            <button
              type="button"
              className="focus-ring absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-muted transition duration-interactive hover:text-copy"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </Field>
      </div>

      {state.message ? <p className="mt-5 text-body-small text-danger">{state.message}</p> : null}

      <Button type="submit" disabled={pending} className="mt-6 w-full">
        <LogIn aria-hidden="true" className="size-4" />
        {pending ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}
