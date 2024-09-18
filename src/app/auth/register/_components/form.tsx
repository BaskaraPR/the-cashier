"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H2, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { registerFormSchema } from "@/lib/validator/auth";
import { signIn } from "next-auth/react";
import { default as NextLink } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { registerUser } from "../actions";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useZodForm({ schema: registerFormSchema });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const registerUserAction = await registerUser(values);

    if (!registerUserAction.success) {
      setLoading(false);
      return toast.error(registerUserAction.message, { id: toastId });
    }

    toast.success(registerUserAction.message, { id: toastId });
    setLoading(false);
    return router.push("/auth/login");
  });

  return (
    <form onSubmit={onSubmit} className="mt-[54px]">
      <div className="mb-[54px] block">
        <H2>Daftar Akun</H2>
        <P>
          Sudah memiliki akun?{" "}
          <NextLink
            href={"/auth/login"}
            className="text-primary-400 transition-all duration-300 hover:text-primary-200"
          >
            Masuk
          </NextLink>
        </P>
      </div>
      <div className="mb-[54px] flex flex-col gap-[22px]">
        <TextField
          className="mb-2"
          label="Nama User"
          placeholder="Masukkan alamat Nama User"
          errorMessage={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <TextField
          className="mb-2"
          label="Username"
          placeholder="Masukkan Username"
          errorMessage={form.formState.errors.username?.message}
          {...form.register("username")}
        />
        <TextField
          className="mb-2"
          label="Password"
          type="password"
          placeholder="Masukkan kata sandi"
          errorMessage={form.formState.errors.password?.message}
          {...form.register("password")}
        />
      </div>
      <Button
        variant={"primary"}
        type="submit"
        className="w-full justify-center"
        disabled={loading}
      >
        Daftar
      </Button>
    </form>
  );
}
