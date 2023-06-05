"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";

const AuthorizationBox = () => {
  const loginModal = useLoginModal();

  const openLogin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div id="login" className="border-l-2 flex items-center h-[70px]">
      <div className="flex items-center h-[70px]">
        <div className="flex flex-row gap-2 items-center px-3 justify-center">
          <div
            onClick={openLogin}
            className="text-white hover:text-green-500 transition cursor-pointer flex flex-row items-center gap-1"
          >
            <FaUserLock size={20} />
            Вхід
          </div>
          <div
            onClick={openLogin}
            className="text-white hover:text-green-500 transition cursor-pointer flex flex-row items-center gap-1"
          >
            <AiOutlineUserAdd size={20} />
            Реєстрація
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationBox;
