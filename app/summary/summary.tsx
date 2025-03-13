"use client";
import { selectPassengers } from "@/lib/features/passenger/passengerSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";

const formatDate = (dateString: string) => {
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
    <div>
      <ul>
        {passengers.map(({ details, services }, index) => (
          <li key={index}>
            <h2>
              {details.name} ({details.category})
            </h2>
            <ul>
              <li>{formatDate(details.dateOfBirth)}</li>
              {Object.entries(services.baggage).map(
                ([baggageType, checked]) =>
                  checked && (
                    <li key={baggageType}>{capitalize(baggageType)} baggage</li>
                  )
              )}
              {details.frequentFlyerNumber && (
                <li>Frequent flyer number: {details.frequentFlyerNumber}</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      <Link href="/services">
        <button>Back</button>
      </Link>
      <Link href="/">
        <button>Book Flight</button>
      </Link>
    </div>
  );
}
