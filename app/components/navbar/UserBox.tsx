import { SafeUser } from "@/app/types";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserBoxProps {
  currentUser?: SafeUser | null;
}

const UserBox: React.FC<UserBoxProps> = ({ currentUser }) => {
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => setUserMenu(!userMenu)}
      className="border-l-2 cursor-pointer hover:bg-slate-200 flex relative items-center h-[70px] px-5 flex-row gap-2"
    >
      {currentUser?.name}
      <Image
        alt="User Avatar"
        width={30}
        height={30}
        src={currentUser?.image}
      />
      {userMenu && (
        <div className="absolute top-[70px] right-0 bg-white border-b-2 min-w-max flex flex-col divide-y-2 shadow-sm rounded-bl-md rounded-br-md overflow-hidden">
          <div
            onClick={() => router.push("/dashboard")}
            className="p-2 cursor-pointer transition hover:bg-gray-400 text-center"
          >
            Панель управління
          </div>
          <div className="p-2 cursor-pointer transition hover:bg-gray-400 text-center">
            Мій профіль
          </div>
          <hr />
          <div
            onClick={() => signOut()}
            className="p-2 cursor-pointer transition hover:bg-gray-400 text-center"
          >
            Вихід
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBox;
