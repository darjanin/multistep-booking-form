"use client";

import { selectPassengers } from "@/lib/features/passenger/passengerSlice";
import { useAppSelector } from "@/lib/hooks";

export default function Overview() {
  const passengers = useAppSelector(selectPassengers);
  return (
    <>
      <h2>Overview</h2>
      <pre>{JSON.stringify(passengers, null, 2)}</pre>
    </>
  );
}
