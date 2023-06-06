"use client";

import { SafeUser } from "@/app/types";

interface DUserWidgetProps {
  currentUser?: SafeUser | null;
}

const DUserWidget: React.FC<DUserWidgetProps> = ({ currentUser }) => {
  return (
    <div>
      <div className="text-2xl font-bold ">Привіт, {currentUser?.name}</div>
    </div>
  );
};

export default DUserWidget;
