"use client";

import Container from "../Container";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-gray-400/60 h-[70px] border-b-2">
      <Container>
        <div className="flex flex-row justify-between items-center border-l-2 border-r-2">
          <div
            id="logo"
            className="flex flex-row items-center justify-center gap-2 px-3 h-full border-r-2"
          >
            <Image
              alt="Logo"
              src="/images/logo.png"
              width={70}
              height={70}
              className="aspect-square"
            />
            <div className="hidden sm:block font-bold text-2xl text-white">
              Workflow
            </div>
          </div>
          <div
            id="menu"
            className="flex flex-row items-center justify-center gap-2 min-h-full"
          >
            logo
          </div>
          <div id="login" className=" border-l-2 flex items-center h-[70px]">
            <div className="flex items-center h-[70px]">logo</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
