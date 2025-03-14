"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  PassengerCategory,
  selectPassengerDetails,
  updatePassengerAndValidate,
} from "@/lib/features/passenger/passenger-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { calculateAge, getCategoryPerAge } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/**
 * A form to collect passenger details.
 */
export default function PassengerForm({ index }: { index: number }) {
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
              Infant (0 - 3)
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
