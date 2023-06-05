"use client";

interface DMenuButtonProps {
  text: string;
  path: () => void;
  current?: boolean;
}

const DMenuButton: React.FC<DMenuButtonProps> = ({ text, path, current }) => {
  return (
    <div
      onClick={path}
      className={`      
      cursor-pointer
        py-2
        px-5
        border-l-4
        border-transparent
        transition
        text-gray-500
        hover:text-green-600
        hover:bg-green-100
        hover:border-green-600
        ${current && 'text-green-600'}
        ${current && 'bg-green-100'}
        ${current && 'border-green-600'}
        `}
    >
      {text}
    </div>
  );
};

export default DMenuButton;
