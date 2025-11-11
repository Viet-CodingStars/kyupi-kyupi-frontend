"use client";

import { SigninForm } from "./ui/signin-form";
import { useForm } from "react-hook-form";
import { useSignIn } from "./hook/use-signin";
import type { SignInRequest } from "@/entities/users/types";
import { useState } from "react";

export function SigninFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>();

  const [serverError, setServerError] = useState<string | null>(null);
  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: SignInRequest) => {
    setServerError(null);
    signIn(data, {
      onSuccess: (result) => {
        if (!result.success && result.error) {
          setServerError(result.error.message);
        }
      },
    });
  };

  return (
    <SigninForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={serverError}
      isPending={isPending}
      errors={errors}
    />
  );
}
