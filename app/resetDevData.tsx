"use client";
import { Button } from "@/components/ui/button";
import { resetDevData } from "@/lib/features/passenger/passenger-slice";
import { useAppDispatch } from "@/lib/hooks";

export default function ResetDevDataButton() {
  const dispatch = useAppDispatch();
  return (
    <Button variant="outline" onClick={() => dispatch(resetDevData())}>
      Reset dev data
    </Button>
  );
}
