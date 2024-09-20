import { P } from "@/app/_components/global/text";
import { default as NextLink } from "next/link";

export default function Home() {
  return (
    <div>
      <h2>wait, is this admin fire??🔥🔥</h2>
      <P>
        login here <br />
        <NextLink
          href={"/auth/login"}
          className="text-primary-400 transition-all duration-300 hover:text-primary-200"
        >
          /---Login---\
        </NextLink>
      </P>
    </div>
  );
}
