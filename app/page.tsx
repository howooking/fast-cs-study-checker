"use client";

import Lottie from "lottie-react";
import lotti from "@/public/animation_check.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2 mt-10 bg-muted w-5/6 mx-auto max-w-4xl ring-2 ring-primary rounded-xl p-10">
      <h1 className="text-3xl">CS 스터디 체커</h1>
      <Lottie animationData={lotti} className="w-[400px] h-[300px]" />
      <div className="text-lg text-center">
        <p>
          450가지 자바스크립트 주제 중 누가 어떤 주제를 했는지 안했는지 체크하기
          위한 웹앱
        </p>
      </div>

      <div className="flex gap-2">
        <p>TOOLS</p>
        <Badge className="bg-orange-400">nextjs</Badge>
        <Badge className="bg-orange-400">supabase</Badge>
        <Badge className="bg-orange-400">shadcnui</Badge>
      </div>
      <Link href="/subjects" className="mt-4">
        <Button size="lg" className="text-xl">
          시작하기
        </Button>
      </Link>
    </div>
  );
}
