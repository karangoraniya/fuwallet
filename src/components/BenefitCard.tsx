import React from "react"

interface BenefitCardProps {
    title: string
    description: string
  }

export default function BenefitCard({ title, description }: BenefitCardProps) {
    return (
      <div className="group rounded-lg bg-gray-700 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    )
  }
  