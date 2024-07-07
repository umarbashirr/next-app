"use client";

import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <aside className="border-r">
      <div className="h-16 px-4 flex items-center justify-start border-b">
        <Logo />
      </div>
      <nav className="flex flex-col items-start justify-start gap-2 mt-4 px-2">
        {routes.map((route, idx) => {
          return (
            <Link
              key={idx}
              href={route.path}
              className={cn(
                "p-2 rounded-lg w-full",
                currentPath.endsWith(route.path)
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
