"use client";

import Link from "next/link";

const NavMenu = () => {
  return (
    <div
      id="menu"
      className="flex flex-row items-center justify-center gap-2 h-[70px]">
      <Link href="/all-resumes">Всі резюме</Link>
    </div>
  );
};

export default NavMenu;
