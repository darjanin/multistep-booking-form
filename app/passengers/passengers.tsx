"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typography-title";
import {
  selectErrorMessage,
  selectPassengerCount,
} from "@/lib/features/passenger/passenger-slice";
import { useAppSelector } from "@/lib/hooks";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import PassengerForm from "./passenger-form";
import PassengerCounter from "./passenger-counter";

export default function Passengers() {
  const router = useRouter();
  const passengersCount = useAppSelector(selectPassengerCount);
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <TypographyTitle>Passengers</TypographyTitle>
        <PassengerCounter />
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
