import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PassengerCategory } from "./features/passenger/passenger-slice";

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

export const formatDate = (dateString: string) => {
  if (dateString === "") return "";
  const date = new Date(Date.parse(dateString));
  return new Intl.DateTimeFormat("sk-SK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
