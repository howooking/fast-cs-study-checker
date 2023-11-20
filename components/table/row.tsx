"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConnectLinkDialog from "./connect-link-dialog";
import { Session } from "@supabase/supabase-js";

type RowProps = {
  subject: {
    id: string;
    number: number;
    title: string;
    is_done: boolean;
    link: string | null;
    profiles: {
      user_name: string | null;
    } | null;
    user_id: string | null;
  };
  session: Session | null;
};

export default function Row({ subject, session }: RowProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      await fetch(`${location.origin}/api/subjects`, {
        method: "PUT",
        body: JSON.stringify({
          id: subject.id,
          is_done: subject.is_done,
          type: "done",
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error, "error while toggling a todo");
      throw new Error("error while toggling a todo");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-center">{subject.number}</TableCell>
      <TableCell>{subject.title}</TableCell>
      <TableCell className="w-12 mx-auto pl-4">
        {isChecking ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <Checkbox
            checked={subject.is_done}
            disabled={subject.is_done && session?.user.id !== subject.user_id}
            onClick={handleCheck}
          />
        )}
      </TableCell>
      <TableCell className="text-center">
        {subject?.profiles?.user_name ?? ""}
      </TableCell>
      <TableCell className="text-center">
        {subject.link ? (
          <div className="flex justify-between">
            <ConnectLinkDialog
              id={subject.id}
              title={subject.title}
              disabled={!subject.is_done}
              link={subject.link || ""}
              edit
            />
            <Button variant="link" size="sm">
              <Link href={subject.link} target="_blank">
                링크
              </Link>
            </Button>
          </div>
        ) : (
          <ConnectLinkDialog
            id={subject.id}
            title={subject.title}
            disabled={!subject.is_done}
            link={subject.link || ""}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
