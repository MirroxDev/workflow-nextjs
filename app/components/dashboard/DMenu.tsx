"use client";

import { SafeUser } from "@/app/types";
import DMenuButton from "./buttons/DMenuButton";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface DMenuProps {
  currentUser?: SafeUser | null;
}

const DMenu: React.FC<DMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3 flex-[0_0_250px] shadow-md bg-white border h-full">
      <div className="flex flex-col w-full pt-5">
        <div className="font-semibold py-1 text-gray-800 px-6">Основне</div>
        <DMenuButton
          text="Панель управління"
          current={pathname === "/dashboard"}
          path={() => router.push("/dashboard")}
        />
      </div>
      <hr />
      <div className="flex flex-col w-full">
        <div className="font-semibold py-1 text-gray-800 px-6">Працівник</div>
        <DMenuButton
          text="Додати резюме"
          current={pathname === "/dashboard/add-resume"}
          path={() => router.push("/dashboard/add-resume")}
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
      <hr />
      <div className="flex flex-col w-full">
        <div className="font-semibold py-1 text-gray-800 px-6">Акаунт</div>
        <DMenuButton
          text="Мій профіль"
          current={pathname === "/dashboard/profile"}
          path={() => router.push("/dashboard/profile")}
        />
        <div
          onClick={() =>
            signOut({
              callbackUrl: `/`,
            })
          }
          className={`      
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
        `}
        >
          Вихід
        </div>
      </div>
    </nav>
  );
};

export default DMenu;
