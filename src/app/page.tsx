import { P } from "@/app/_components/global/text";
import { default as NextLink } from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Wait, is this admin fire?? 🔥🔥
        </h2>
        <P className="text-gray-600">Manage everything from here with ease!</P>
      </header>
      <div>
        <P className="text-lg">
          Ready to dive in? <br />
          <NextLink
            href={"/auth/login"}
            className="inline-block mt-4 px-6 py-3 bg-primary-400 text-black font-semibold rounded-lg shadow-md hover:bg-primary-200 transition-all duration-300"
            aria-label="Login to your account"
          >
            Let’s Gooo!
          </NextLink>
        </P>
      </div>
    </section>
  );
}
