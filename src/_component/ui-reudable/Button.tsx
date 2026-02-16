import { ChildrenType } from "@/types/types";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

interface PropsButton {
  children: React.ReactNode;
  props: Props;
}

const ButtonComponent = ({ children, ...props }: PropsButton) => {
  return (
    <input
      className="!rounded-[5px] w-full
         bg-indigo-500
          px-3 py-1.5
           text-sm/6 font-semibold text-white
            hover:bg-indigo-400"
      {...props}
    >
      {children}
    </input>
  );
};

export default ButtonComponent;
