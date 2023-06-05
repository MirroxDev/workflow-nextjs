"use client";

import { useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = useCallback(
    (event: any) => {
      event.stopPropagation();

      setShowModal(false);
      setTimeout(() => {
        onClose();
      }, 300);
    },
    [onClose]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className="
      justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="  
          bg-white
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
            z-10
            rounded-xl
            overflow-hidden
            "
      >
        <div className="text-center font-bold text-xl py-3 relative">
          <div
            onClick={handleClose}
            className="
            absolute 
            cursor-pointer 
            hover:opacity-80 
            transition 
            top-[50%] 
            left-4 
            translate-y-[-50%]
            "
          >
            <AiFillCloseCircle size={30} className="fill-red-400" />
          </div>
          {title}
        </div>
        <hr />
        <div className="p-3">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
