"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H2 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { loginFormSchema } from "@/lib/validator/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useZodForm({ schema: loginFormSchema });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setLoading(false);
        return toast.error(
          res.error === "CredentialsSignin"
            ? "Username atau password salah!"
            : "Terjadi kesalahan",
          { id: toastId }
        );
      }
      toast.success("Berhasil login!", { id: toastId });
      router.push("/admin");
    } catch (error) {
      toast.error("Terjadi kesalahan", { id: toastId });
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="mt-14 w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <H2 className="text-center mb-14">Masuk ke Akun Anda</H2>

        <div className="flex flex-col gap-6 mb-14">
          <TextField
            label="Username"
            placeholder="Masukkan Username"
            errorMessage={form.formState.errors.username?.message}
            {...form.register("username")}
            aria-label="Username"
            required
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Masukkan kata sandi"
            errorMessage={form.formState.errors.password?.message}
            {...form.register("password")}
            aria-label="Password"
            required
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full justify-center"
          disabled={loading}
        >
          {loading ? "Loading..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
}
