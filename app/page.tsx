import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typography-title";
import type { Metadata } from "next";
import Link from "next/link";
import ResetDevDataButton from "./resetDevData";

export default function IndexPage() {
  return (
    <div className="space-y-10 text-center">
      <TypographyTitle>Hello to Assignment</TypographyTitle>
      <div className="text-sm text-slate-700">
        <p>
          By clicking Book flight you can start process of choosing number of
          passengers and additional services.
        </p>
        <p>
          By clicking Reset dev data you can reset store to contain a prefilled
          state with passengers filled in.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Link href="/passengers">
          <Button>Book a flight</Button>
        </Link>
        <ResetDevDataButton />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Multi-Step Booking Form",
};
