"use client";
import {
  Baggage,
  PassengerCategory,
  selectPassengers,
} from "@/lib/features/passenger/passengerSlice";
import { useAppSelector } from "@/lib/hooks";

// In case of this example, the pricing is hardcoded.
// In a real-world application, you would fetch this data from an API.
// With currency information attached to amounts.
const pricing = {
  "category.adult": 100,
  "category.child": 75,
  "category.infant": 50,
  "baggage.cabin": 10,
  "baggage.checked": 20,
};

const categoryTypes: PassengerCategory[] = ["adult", "child", "infant"];
const baggageTypes: (keyof Baggage)[] = ["cabin", "checked"];

export default function Overview() {
  const passengers = useAppSelector(selectPassengers);

  const categories = categoryTypes.reduce(
    (acc, type) => ({
      ...acc,
      [type]: passengers.filter(
        ({ details: { category } }) => category === type
      ).length,
    }),
    {} as Record<PassengerCategory, number>
  );
  const baggage = baggageTypes.reduce(
    (acc, type) => ({
      ...acc,
      [type]: passengers.filter(({ services: { baggage } }) => baggage[type])
        .length,
    }),
    {} as Record<keyof Baggage, number>
  );
  const total =
    categoryTypes.reduce(
      (acc, type) => pricing[`category.${type}`] * categories[type] + acc,
      0
    ) +
    baggageTypes.reduce(
      (acc, type) => pricing[`baggage.${type}`] * baggage[type] + acc,
      0
    );

  return (
    <div>
      <h2>Overview</h2>
      <ul>
        {categoryTypes.map(
          (type) =>
            categories[type] > 0 && (
              <li key={type}>
                {categories[type]}x {type} passenger -{" "}
                {pricing[`category.${type}`] * categories[type]}€
              </li>
            )
        )}
        {baggageTypes.map(
          (type) =>
            baggage[type] > 0 && (
              <li key={type}>
                {baggage[type]}x {type} passenger -{" "}
                {pricing[`baggage.${type}`] * baggage[type]}€
              </li>
            )
        )}
        <li>Total - {total}€</li>
      </ul>
    </div>
  );
}
