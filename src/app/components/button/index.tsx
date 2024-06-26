"use client";

import { MouseEventHandler } from "react";

interface Props {
  title: string;
  type?: "submit" | "button" | "reset";
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

const Button = ({ title, type = "button", onClick, disabled }: Props) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center  ${
        disabled ? "bg-gray-600" : "bg-gray-900"
      } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
