import { Display } from "../_components/global/text";
import { getServerSession } from "@/lib/next-auth";

export default async function manajerDashboard() {
  const session = await getServerSession();
  return (
    <div>
      <Display>
        Welcome
        <span className="text-primary-400">
          {session?.user?.name.split(" ")[0]}
        </span>
        !
      </Display>
    </div>
  );
}
