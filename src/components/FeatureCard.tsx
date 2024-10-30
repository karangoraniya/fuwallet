import React from "react";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group flex flex-col items-center rounded-lg bg-gray-700 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}
