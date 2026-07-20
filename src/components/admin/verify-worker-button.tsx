"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type VerifyWorkerButtonProps = {
  workerId: string;
};

export function VerifyWorkerButton({ workerId }: VerifyWorkerButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleVerify() {
    const response = await fetch("/api/admin/verify-worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId }),
    });

    if (response.ok) {
      startTransition(() => router.refresh());
    }
  }

  return (
    <Button onClick={handleVerify} disabled={isPending} className="bg-emerald-600 text-white hover:bg-emerald-700">
      {isPending ? "Verifying..." : "Verify"}
    </Button>
  );
}