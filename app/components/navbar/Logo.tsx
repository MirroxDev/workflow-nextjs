"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  textBlack?: boolean;
  borderRight?: boolean;
}

const Logo:React.FC<LogoProps> = ({textBlack, borderRight}) => {
  const router = useRouter();
  return (
      <div
      onClick={() => router.push("/")}
      id="logo"
      className={`flex flex-row items-center justify-center gap-2 p-3 h-[70px] ${borderRight ? 'border-r-2' : 'border-r-none'} cursor-pointer}`}
    >
      <Image
        alt="Logo"
        src="/images/logo.png"
        width={60}
        height={60}
        className="aspect-square min-w-[30px]"
      />
      <div className={`hidden sm:block font-bold text-2xl  ${textBlack ? 'text-black' : 'text-white'}`}>
        Workflow
      </div>
    </div>
  );
};

export default Logo;
