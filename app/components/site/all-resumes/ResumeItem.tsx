"use client";
import Image from "next/image";
import { FaRegMoneyBillAlt } from "react-icons/fa";

interface ResumeItemProps {
  id: string;
  name: string;
  rank: string;
  location: string;
  skills: string;
  minrate: string;
}

const ResumeItem: React.FC<ResumeItemProps> = ({
  name,
  rank,
  location,
  skills,
  minrate,
}) => {
  const str = skills;
  const clearElements = str.replace(/ /g, "-");
  const elements = clearElements.split(",");

  return (
    <div>
      <div
        onClick={() => {}}
        className="flex flex-row p-8 gap-8 border bg-white cursor-pointer hover:bg-green-200 transition">
        <div className="">
          <Image
            alt="candidate icon"
            src="/images/computer-worker.png"
            width={80}
            height={80}
            className="w-full object-cover"
          />
        </div>
        <div className="flex-[1_1]">
          <div className="flex flex-col gap-2">
            <div className="text-lg text-green-600">{name}</div>
            <div>{rank}</div>
            <div className="flex flex-row items-center gap-4">
              <div>{location}</div>
              {minrate && (
                <div className="flex flex-row items-center gap-2">
                  <FaRegMoneyBillAlt size={20} />
                  {minrate} грн.
                </div>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              {elements.map((element) => (
                <>
                  <div className="py-1 px-2 bg-gray-400 rounded-sm text-gray-700">
                    {element}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
