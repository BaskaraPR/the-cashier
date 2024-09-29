"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H2, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { loginFormSchema } from "@/lib/validator/auth";
import { signIn } from "next-auth/react";
import { default as NextLink } from "next/link";
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
        name: values.name,
        password: values.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setLoading(false);
        return toast.error(
          res.error === "CredentialsSignin"
            ? "Nama User atau password salah!"
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
        className="mt-[54px] w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-[54px] block">
          <H2 className="text-center">Masuk ke Akun Anda</H2>
          <P className="text-center">
            Belum memiliki akun?{" "}
            <NextLink
              href={"/auth/register"}
              className="text-primary-400 transition-all duration-300 hover:text-primary-200"
            >
              Daftar
            </NextLink>
          </P>
        </div>
        <div className="block w-full">
          <div className="relative mb-[28px] w-full">
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2"
              width="185"
              height="2"
              viewBox="0 0 185 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H185" stroke="url(#paint0_linear_1094_9415)" />
              <defs>
                <linearGradient
                  id="paint0_linear_1094_9415"
                  x1="0"
                  y1="1"
                  x2="185"
                  y2="1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8E8E8E" stopOpacity="0" />
                  <stop offset="1" stopColor="#8E8E8E" />
                </linearGradient>
              </defs>
            </svg>
            <p className="absolute left-1/2 top-1/2 z-[100] h-[22px] w-[50px] -translate-x-1/2 -translate-y-1/2 text-center text-sm text-neutral-400">
              Atau
            </p>
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180"
              width="185"
              height="2"
              viewBox="0 0 185 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H185" stroke="url(#paint0_linear_1094_9415)" />
              <defs>
                <linearGradient
                  id="paint0_linear_1094_9415"
                  x1="0"
                  y1="1"
                  x2="185"
                  y2="1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8E8E8E" stopOpacity="0" />
                  <stop offset="1" stopColor="#8E8E8E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="mb-[54px] flex flex-col gap-[22px]">
          <TextField
            className="mb-2"
            label="Nama User"
            placeholder="Masukkan Nama User"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
            aria-label="Nama User"
            required
          />
          <TextField
            className="mb-2"
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
          variant={"primary"}
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
