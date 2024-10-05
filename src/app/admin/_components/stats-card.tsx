import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  count: number;
  Icon: IconType;
}

export default function StatsCard({ title, count, Icon }: StatsCardProps) {
  return (
    <div className="flex w-[240px] items-center justify-between rounded bg-purple-300 p-6 shadow-md">
      <div>
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="text-2xl font-bold text-black">{count}</p>
      </div>
      <div className="rounded-lg bg-secondary-50 p-4 text-black-400">
        <Icon size={24} />
      </div>
    </div>
  );
}


