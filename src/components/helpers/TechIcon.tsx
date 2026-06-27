import { cn } from "@/lib/utils";
import type { TechItem } from "@/data/tech";

type TechIconProps = {
  item: TechItem;
  className?: string;
};

const TechIcon = ({ item, className }: TechIconProps) => {
  return (
    <span className="relative inline-flex shrink-0">
      <img
        src={item.icon}
        alt={item.name}
        className={cn("block", className, item.darkIcon ? "dark:hidden" : "")}
      />
      {item.darkIcon ? (
        <img
          src={item.darkIcon}
          alt={item.name}
          className={cn("hidden", className, "dark:block")}
        />
      ) : null}
    </span>
  );
};

export default TechIcon;
