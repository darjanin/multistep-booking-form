import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typographyTitle";
import type { Metadata } from "next";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="space-y-10 text-center">
      <TypographyTitle>Hello to Kiwi Assignment</TypographyTitle>
      <Link href="/passengers">
        <Button>Book a flight</Button>
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Multistep Booking Form",
};
