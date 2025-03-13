"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypographyTitle } from "@/components/ui/typographyTitle";
import {
  addPassengerAndValidate,
  PassengerCategory,
  removePassenger,
  selectErrorMessage,
  selectPassengerCount,
  selectPassengerDetails,
  updatePassengerAndValidate,
} from "@/lib/features/passenger/passengerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { calculateAge, getCategoryPerAge } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PassengerForm({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const passenger = useAppSelector((state) =>
    selectPassengerDetails(state, index),
  );

  const handleCategoryChange = (category: string) => {
    const updatedPassenger = {
      ...passenger,
      dateOfBirth: "",
      category: category as PassengerCategory,
    };
    dispatch(
      updatePassengerAndValidate({ index, passenger: updatedPassenger }),
    );
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateOfBirth = e.currentTarget.value;
    const age = calculateAge(dateOfBirth);
    const category = getCategoryPerAge(age);

    const updatedPassenger = {
      ...passenger,
      dateOfBirth,
      category,
    };
    dispatch(
      updatePassengerAndValidate({ index, passenger: updatedPassenger }),
    );
  };

  const handlePassengerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedPassenger = {
      ...passenger,
      name: e.currentTarget.value,
    };
    dispatch(
      updatePassengerAndValidate({ index, passenger: updatedPassenger }),
    );
  };

  const handleFrequentFlyerNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedPassenger = {
      ...passenger,
      frequentFlyerNumber: e.currentTarget.value,
    };
    dispatch(
      updatePassengerAndValidate({ index, passenger: updatedPassenger }),
    );
  };

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-3">
          <ToggleGroup
            type="single"
            variant="outline"
            value={passenger.category}
            className="w-full"
            onValueChange={handleCategoryChange}
          >
            <ToggleGroupItem value="adult" aria-label="Adult (age 18 and more)">
              Adult (18+)
            </ToggleGroupItem>
            <ToggleGroupItem value="child" aria-label="Child (3 - 17)">
              Child (3 - 17)
            </ToggleGroupItem>
            <ToggleGroupItem value="infant" aria-label=" Infant (1 - 3)">
              Infant (1 - 3)
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="grid grid-cols-12 gap-3">
            <Input
              type="text"
              placeholder="Passenger name"
              name="name"
              minLength={3}
              value={passenger.name}
              className="col-span-8"
              onChange={handlePassengerNameChange}
            />
            <Input
              type="date"
              name="dateOfBirth"
              value={passenger.dateOfBirth}
              className="col-span-4"
              onChange={handleDateOfBirthChange}
            />
          </div>
          {passenger.category === "adult" && (
            <Input
              type="text"
              name="frequentFlyerNumber"
              placeholder="Frequent flyer number (optional)"
              value={passenger.frequentFlyerNumber}
              onChange={handleFrequentFlyerNumberChange}
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default function Passengers() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const passengersCount = useAppSelector(selectPassengerCount);
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <TypographyTitle>Passengers</TypographyTitle>
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
      </div>
      <div className="space-y-4">
        {Array.from(Array(passengersCount), (_, index) => index).map(
          (index) => (
            <PassengerForm key={index} index={index} />
          ),
        )}
      </div>

      <div className="flex justify-end gap-2">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}
        <Button
          onClick={() => {
            router.push("/services");
          }}
          disabled={!!errorMessage}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
