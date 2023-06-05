"use client";

import { SafeUser } from "@/app/types";
import DMenuButton from "./buttons/DMenuButton";
import { useRouter, usePathname } from "next/navigation";

interface DMenuProps {
  currentUser?: SafeUser | null;
}

const DMenu: React.FC<DMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="flex flex-col gap-3 flex-[0_0_250px] shadow-md bg-white border">
      <div className="flex flex-col w-full pt-5">
        <div className="font-semibold py-1 text-gray-800 px-6">Основне</div>
        <div
          className="
        cursor-pointer
        py-2
        px-5
        border-l-4
        border-transparent
        transition
        text-gray-500
        hover:text-green-600
        hover:bg-green-100
        hover:border-green-600
        "
        >
          Панель управління
        </div>
      </div>
      <hr />
      <div className="flex flex-col w-full">
        <div className="font-semibold py-1 text-gray-800 px-6">Працівник</div>
        <DMenuButton
          text="Додати резюме"
          current={pathname === "/dashboard/profile"}
          path={() => router.push("/dashboard/profile")}
        />
        <DMenuButton
          text="Мої портфоліо"
          current={pathname === "/dashboard/profile"}
          path={() => router.push("/dashboard/profile")}
        />
        <DMenuButton
          text="Профіль"
          current={pathname === "/dashboard/profile"}
          path={() => router.push("/dashboard/profile")}
        />
      </div>
    </nav>
  );
};

export default DMenu;
