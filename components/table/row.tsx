"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConnectLinkDialog from "./connect-link-dialog";

type RowProps = {
  subject: {
    id: string;
    number: number;
    title: string;
    is_done: boolean;
    user_name: string | null;
    link: string | null;
  };
  userName?: string;
};

export default function Row({ subject, userName }: RowProps) {
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
          user_name: userName,
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
            disabled={subject.is_done && userName !== subject.user_name}
            onClick={handleCheck}
          />
        )}
      </TableCell>
      <TableCell className="text-center">{subject.user_name}</TableCell>
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
