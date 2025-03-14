"use client";
import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typography-title";
import { selectPassengerCount } from "@/lib/features/passenger/passenger-slice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import ServiceForm from "./service-form";

export default function Services() {
  const passengersCount = useAppSelector(selectPassengerCount);

  return (
    <div className="space-y-6">
      <TypographyTitle>Services</TypographyTitle>
      <div className="space-y-4">
        {Array.from(Array(passengersCount), (_, index) => index).map(
          (index) => (
            <ServiceForm key={index} index={index} />
          ),
        )}
      </div>
      <div className="flex justify-between">
        <Link href="/passengers">
          <Button variant="outline">Back</Button>
        </Link>
        <Link href="/summary">
          <Button>Continue</Button>
        </Link>
      </div>
    </div>
  );
}
