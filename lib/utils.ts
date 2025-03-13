import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PassengerCategory } from "./features/passenger/passengerSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If the birth date hasn't occurred yet this year, subtract one from the age
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function getCategoryPerAge(age: number): PassengerCategory {
  if (age >= 18) return "adult";
  if (age >= 3) return "child";
  return "infant";
}
