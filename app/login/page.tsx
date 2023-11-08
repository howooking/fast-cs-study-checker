"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClientComponentClient();

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

  return (
    <Card className="w-3/4 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>구글아이디 없진 않잖아</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="flex gap-2 w-full "
        >
          <FcGoogle />
          구글 로그인
        </Button>
      </CardContent>
      <CardFooter>Provided by Google</CardFooter>
    </Card>
  );
}
