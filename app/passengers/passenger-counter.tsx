"use client";
import { Button } from "@/components/ui/button";
import {
  addPassengerAndValidate,
  removePassenger,
  selectPassengerCount,
} from "@/lib/features/passenger/passengerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function PassengerCounter() {
  const dispatch = useAppDispatch();
  const passengersCount = useAppSelector(selectPassengerCount);
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={() => {
          dispatch(removePassenger());
        }}
        disabled={passengersCount <= 1}
      >
        -
      </Button>
      {passengersCount}
      <Button
        size="sm"
        disabled={passengersCount >= 9}
        onClick={() => {
          dispatch(addPassengerAndValidate());
        }}
      >
        +
      </Button>
    </div>
  );
}
