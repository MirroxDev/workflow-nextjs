"use client";

interface ContainerProps {
  children: React.ReactNode;
  small?: boolean;
  custom?: string;
}

const Container: React.FC<ContainerProps> = ({ children, small, custom }) => {
  return (
    <div
      className={`      
      ${small ? "max-w-[1420px]" : "max-w-[2520px]"}
    mx-auto
    xl:px-20
    md:px-10
    sm:px-2
    px-0
    ${custom}
    `}>
      {children}
    </div>
  );
};

export default Container;
