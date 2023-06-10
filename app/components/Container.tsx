"use client";

interface ContainerProps {
  children: React.ReactNode;
  small?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children , small }) => {
  return (
    <div
      className={`      
      ${small ? "max-w-[1420px]": "max-w-[2520px]"}
    
    mx-auto
    xl:px-20
    md:px-10
    sm:px-2
    px-0`}
    >
      {children}
    </div>
  );
};

export default Container;
