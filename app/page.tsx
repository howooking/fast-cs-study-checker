"use client";

import Lottie from "lottie-react";
import lotti from "@/public/animation_check.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2 p-2 mt-10 bg-slate-100 w-3/4 mx-auto max-w-3xl py-20 ring-2 ring-primary rounded-xl">
      <h1 className="text-3xl">CS 스터디 체커</h1>
      <Lottie animationData={lotti} className="w-[400px]" />
      <p className="text-md sm:text-2xl">선 체크 필승</p>
      <Link href="/subjects" className="mt-4">
        <Button>시작하기</Button>
      </Link>
    </div>
  );
}
