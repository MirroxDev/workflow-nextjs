"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
      <div
      onClick={() => router.push("/")}
      id="logo"
      className="flex flex-row items-center justify-center gap-2 px-3 h-[70px] border-r-2 cursor-pointer"
    >
      <Image
        alt="Logo"
        src="/images/logo.png"
        width={70}
        height={70}
        className="aspect-square min-w-[30px]"
      />
      <div className="hidden sm:block font-bold text-2xl text-white">
        Workflow
      </div>
    </div>
  );
};

export default Logo;
