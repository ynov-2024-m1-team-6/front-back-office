"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  name: string;
  link?: {
    title: string;
    href: string;
  };
  onChange: Dispatch<SetStateAction<string | undefined>>;
}

const Input = ({ title, name, link, onChange }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
        {link && (
          <div className="text-sm">
            <Link
              href={link.href}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {link.title}
            </Link>
          </div>
        )}
      </div>
      <div>
        <input
          id={name}
          name={name}
          type={name}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
