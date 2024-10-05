import Link from "@/app/_components/global/button";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import LoginForm from "./_components/form";

export default async function Login() {
  const session = await getServerSession();
  if (session) return redirect("/admin");

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <Link href="/" variant="tertiary" className="flex">
        <FaArrowLeft className="mr-1" /> Kembali
      </Link>
      <LoginForm />
    </div>
  );
}
