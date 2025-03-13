"use client";
import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typographyTitle";
import { selectPassengers } from "@/lib/features/passenger/passengerSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";

const formatDate = (dateString: string) => {
  if (dateString === "") return "";
  const date = new Date(Date.parse(dateString));
  return new Intl.DateTimeFormat("sk-SK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Summary() {
  const passengers = useAppSelector(selectPassengers);

  return (
    <div className="space-y-6">
      <TypographyTitle>Summary</TypographyTitle>
      <ul className="space-y-4">
        {passengers.map(({ details, services }, index) => (
          <li key={index}>
            <h2 className="text-lg font-medium">
              {details.name} <small>({details.category})</small>
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>{formatDate(details.dateOfBirth)}</li>
              {Object.entries(services.baggage).map(
                ([baggageType, checked]) =>
                  checked && (
                    <li key={baggageType}>{capitalize(baggageType)} baggage</li>
                  ),
              )}
              {details.frequentFlyerNumber && (
                <li>
                  Frequent flyer number:{" "}
                  <code>{details.frequentFlyerNumber}</code>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Link href="/services">
          <Button variant="outline">Back</Button>
        </Link>
        <Link href="/">
          <Button>Book Flight</Button>
        </Link>
      </div>
    </div>
  );
}
