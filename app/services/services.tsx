"use client";
import {
  selectPassenger,
  selectPassengers,
  updateBaggage,
} from "@/lib/features/passenger/passengerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";

function ServiceForm({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const passenger = useAppSelector((state) => selectPassenger(state, index));

  const handlePassengerChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const baggage = {
      cabin: e.currentTarget.cabin.checked,
      checked: e.currentTarget.checked.checked,
    };
    dispatch(updateBaggage({ index, baggage }));
  };

  return (
    <form onChange={handlePassengerChange}>
      <label>
        <input
          type="checkbox"
          name="cabin"
          defaultChecked={passenger.services.baggage.cabin}
        />
        Cabin baggage
      </label>
      <label>
        <input
          type="checkbox"
          name="checked"
          defaultChecked={passenger.services.baggage.checked}
        />
        Checked baggage
      </label>
    </form>
  );
}

export default function Services() {
  const passengers = useAppSelector(selectPassengers);

  return (
    <div>
      {passengers.map((_, index) => (
        <ServiceForm key={index} index={index} />
      ))}
      <Link href="/passengers">
        <button>Back</button>
      </Link>
      <Link href="/summary">
        <button>Continue</button>
      </Link>
    </div>
  );
}
