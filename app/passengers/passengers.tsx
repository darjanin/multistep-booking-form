"use client";
import {
  addPassenger,
  removePassenger,
  selectPassengerDetails,
  selectPassengers,
  updatePassenger,
} from "@/lib/features/passenger/passengerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

function PassengerForm({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const passenger = useAppSelector((state) =>
    selectPassengerDetails(state, index)
  );

  const handlePassengerChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const passenger = {
      category: e.currentTarget.category.value as "adult" | "child" | "infant",
      name: e.currentTarget.passengerName.value,
      dateOfBirth: e.currentTarget.dateOfBirth.value,
      frequentFlyerNumber: e.currentTarget.frequentFlyerNumber.value,
    };
    dispatch(updatePassenger({ index, passenger }));
  };

  return (
    <form onChange={handlePassengerChange}>
      <select name="category" defaultValue={passenger.category}>
        <option value="adult">Adult (age 18 and more)</option>
        <option value="child">Child (age 3 - 17)</option>
        <option value="infant">Infant (age 1 - 3)</option>
      </select>
      <input
        type="text"
        placeholder="name"
        name="passengerName"
        minLength={3}
        defaultValue={passenger.name}
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="date of birth"
        defaultValue={passenger.dateOfBirth}
      />
      <input
        type="text"
        name="frequentFlyerNumber"
        placeholder="frequent flyer number"
        defaultValue={passenger.frequentFlyerNumber}
      />
    </form>
  );
}

export default function Passengers() {
  const dispatch = useAppDispatch();
  const passengers = useAppSelector(selectPassengers);
  const passengersCount = passengers.length;

  return (
    <div>
      <div>
        Passengers
        <button
          onClick={() => {
            dispatch(removePassenger());
          }}
          disabled={passengersCount <= 1}
        >
          -
        </button>
        {passengersCount}
        <button
          disabled={passengersCount >= 9}
          onClick={() => {
            dispatch(addPassenger());
          }}
        >
          +
        </button>
      </div>
      {passengers.map((_, index) => (
        <PassengerForm key={index} index={index} />
      ))}
      <Link href="/services">
        <button>Continue</button>
      </Link>
    </div>
  );
}
