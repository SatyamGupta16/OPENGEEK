"use client";
import React, { useEffect, useId } from "react";
import { motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className="relative inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 rounded-sm"
    >
      <span
        className={cn(
          "dark:text-white inline-block text-neutral-900 relative z-20",
          className
        )}
      >
        {children}
      </span>
      <CircleIcon className="absolute -right-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -right-[2px]" />
      <CircleIcon className="absolute -left-[2px] -top-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" />
    </div>
  );
};

export const CircleIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="2"
        cy="2"
        r="2"
        className="fill-neutral-900 dark:fill-white"
      />
    </svg>
  );
};
