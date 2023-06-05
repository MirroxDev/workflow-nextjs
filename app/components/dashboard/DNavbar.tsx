"use client";

import { SafeUser } from "@/app/types";
import UserBox from "../navbar/UserBox";
import Logo from "../navbar/Logo";

interface DNavbar {
  currentUser?: SafeUser | null;
}

const DNavbar: React.FC<DNavbar> = ({ currentUser }) => {
  return (
    <header className="flex flex-row h-[70px] bg-white shadow-md">
      <div className="flex flex-[0_0_250px] h-[70px] justify-center items-center border-r-2">
        <Logo textBlack={true} />
      </div>
      <div className="flex flex-[1_1] h-[70px] items-center justify-center">
        Tollbar
      </div>
      <div className="flex flex-[0_0_150px] h-[70px] items-center justify-center">
        <UserBox currentUser={currentUser} />
      </div>
    </header>
  );
};

export default DNavbar;
