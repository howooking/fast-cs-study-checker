"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClient();

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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing in with google",
        description: "Try later",
      });
      console.error(error);
    }
  };
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing in with google",
        description: "Try later",
      });
      console.error(error);
    }
  };

  return (
    <Card className="w-5/6 mx-auto max-w-sm mt-40">
      <CardHeader>
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>깃허브 추가</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="flex gap-2 w-full "
        >
          <FcGoogle />
          구글 로그인
        </Button>
        <Button
          type="button"
          onClick={handleGithubLogin}
          className="flex gap-2 w-full "
        >
          <FaGithub />
          깃허브 로그인
        </Button>
      </CardContent>
      <CardFooter>Provided by Google & Github</CardFooter>
    </Card>
  );
}
