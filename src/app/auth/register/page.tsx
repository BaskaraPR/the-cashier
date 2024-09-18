import RegisterForm from "./_components/form";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "@/app/_components/global/button";

export default async function Register() {
  const session = await getServerSession();
  if (session) return redirect("/");

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <section className="flex w-full max-w-[1440px] items-center justify-between p-12">
        <div className="block w-full max-w-full xl:max-w-[460px]">
          <Link href="/" variant={"tertiary"}>
            <FaArrowLeft /> Kembali
          </Link>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
