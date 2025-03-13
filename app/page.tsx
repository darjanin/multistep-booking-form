import type { Metadata } from "next";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <h1>Hello to Kiwi Assignment</h1>
      <Link href="/passengers">
        <button>Book a flight</button>
      </Link>
    </>
  );
}

export const metadata: Metadata = {
  title: "Multistep Booking Form",
};
