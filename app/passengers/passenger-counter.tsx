"use client";
import { Button } from "@/components/ui/button";
import {
  addPassengerAndValidate,
  removePassengerAndValidate,
  selectPassengerCount,
} from "@/lib/features/passenger/passenger-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

/**
 * A component that allows the user to increment or decrement the number of passengers.
 */
export default function PassengerCounter() {
  const dispatch = useAppDispatch();
  const passengersCount = useAppSelector(selectPassengerCount);
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={() => {
          dispatch(removePassengerAndValidate());
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
