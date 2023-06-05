"use client";

import Container from "../Container";
import AuthorizationBox from "./AuthorizationBox";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import UserBox from "./UserBox";

interface NavBarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="bg-gray-400/60 h-[70px] border-b-2 fixed w-full">
      <Container>
        <div className="flex flex-row justify-between items-center border-l-2 border-r-2">
          <Logo borderRight />
          <NavMenu />
          {currentUser ? <UserBox currentUser={currentUser} /> : <AuthorizationBox />}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
