"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await fetch(`${location.origin}/api/nickname`, {
        method: "POST",
        body: JSON.stringify({
          nickname: nicknameInput,
        }),
      });
      if (data) {
        toast({
          variant: "default",
          title: "반갑습니다!!",
        });
        router.push("subjects");
      }

      router.refresh();
    } catch (error) {
      console.error(error, "error while toggling a todo");
      throw new Error("error while toggling a todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-5/6 mx-auto max-w-sm mt-40">
      <CardHeader>
        <CardTitle className="text-xl">회원가입</CardTitle>
        <CardDescription>닉네임 나중에 변경 가능함</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <Input
            placeholder="닉네임"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "회원가입"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
