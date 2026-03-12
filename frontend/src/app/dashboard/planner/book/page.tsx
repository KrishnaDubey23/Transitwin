"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/planner/services");
  }, [router]);

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <p className="text-[#6B6B6B] text-sm">Redirecting to Book Supporting Services...</p>
    </div>
  );
}
