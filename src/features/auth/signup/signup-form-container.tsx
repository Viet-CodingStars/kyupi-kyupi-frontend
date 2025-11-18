"use client";

import { SignupForm, type SignupFormData } from "./ui/signup-form";
import { useForm } from "react-hook-form";
import { useSignUp } from "./hook/use-signup";
import type { SignUpRequest } from "@/entities/users/types";
import { useState } from "react";

export const SignupFormContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignupFormData>();

  const [serverError, setServerError] = useState<string | null>(null);
  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignupFormData) => {
    setServerError(null);

    const { confirmPassword, ...signupData } = data;

    signUp(signupData as SignUpRequest, {
      onSuccess: (result) => {
        if (!result.success && result.error) {
          setServerError(result.error);
        }
      },
    });
  };

  return (
    <SignupForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch}
      control={control}
      error={serverError}
      isPending={isPending}
      errors={errors}
    />
  );
};
