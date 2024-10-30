import React from "react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export default function StepCard({
  number,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="group flex flex-col items-center rounded-lg bg-gray-800 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold transition-transform duration-300 group-hover:scale-110">
        {number}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}
