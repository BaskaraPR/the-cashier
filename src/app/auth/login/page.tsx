import Link from "@/app/_components/global/button";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import LoginForm from "./_components/form";

export default async function Login() {
  const session = await getServerSession();
  if (session) return redirect("/admin");

  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
      <section className="flex w-full max-w-[1440px] items-center justify-center p-6 md:p-12">
        <div className="block w-full max-w-full xl:max-w-[460px] bg-white p-6 rounded-lg shadow-md">
          <header className="mb-4">
            <Link href="/" variant={"tertiary"} className="flex items-center">
              <FaArrowLeft className="mr-2" /> Kembali
            </Link>
          </header>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
