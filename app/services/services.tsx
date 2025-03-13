"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TypographyTitle } from "@/components/ui/typographyTitle";
import {
  selectPassenger,
  selectPassengers,
  updateBaggage,
} from "@/lib/features/passenger/passengerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useId } from "react";

function ServiceForm({ index }: { index: number }) {
  const checkedId = useId();
  const cabinId = useId();
  const dispatch = useAppDispatch();
  const passenger = useAppSelector((state) => selectPassenger(state, index));

  const handlePassengerChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const baggage = {
      cabin: e.currentTarget.cabin?.checked ?? false,
      checked: e.currentTarget.checked?.checked ?? false,
    };
    dispatch(updateBaggage({ index, baggage }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {passenger.details.name} <small>({passenger.details.category})</small>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onChange={handlePassengerChange} className="grid grid-cols-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={checkedId}
              name="checked"
              defaultChecked={passenger.services.baggage.checked}
            />
            <label
              htmlFor={checkedId}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Checked baggage
            </label>
          </div>
          {passenger.details.category !== "infant" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={cabinId}
                name="cabin"
                defaultChecked={passenger.services.baggage.cabin}
              />
              <label
                htmlFor={cabinId}
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cabin baggage
              </label>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default function Services() {
  const passengers = useAppSelector(selectPassengers);

  return (
    <div className="space-y-6">
      <TypographyTitle>Services</TypographyTitle>
      <div className="space-y-4">
        {passengers.map((_, index) => (
          <ServiceForm key={index} index={index} />
        ))}
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
