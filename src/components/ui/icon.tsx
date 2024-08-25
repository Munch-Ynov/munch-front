import { icons } from "lucide-react";

const Icon = ({
  name,
  className,
}: {
  name: keyof typeof icons;
  className?: string;
}) => {
  const LucideIcon = icons[name];

  return <LucideIcon className={className} />;
};

export default Icon;
