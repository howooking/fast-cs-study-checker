import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

type RowProps = {
  subject: {
    id: string;
    number: number;
    title: string;
    is_done: boolean;
    user_name: string | null;
    link: string | null;
  };
};

export default function Row({ subject }: RowProps) {
  return (
    <TableRow>
      <TableCell className="text-center">{subject.number}</TableCell>
      <TableCell>{subject.title}</TableCell>
      <TableCell className="text-center">
        <Checkbox checked={subject.is_done} />
      </TableCell>
      <TableCell className="text-center">{subject.user_name}</TableCell>
      <TableCell className="text-center">
        {subject.link && (
          <Button variant="link">
            <Link href={subject.link} target="_blank">
              링크
            </Link>
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
