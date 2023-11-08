import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Checkbox } from "@/components/ui/checkbox";

export default async function Home() {
  const { data: subjects, error } = await createServerComponentClient({
    cookies,
  })
    .from("subjects")
    .select("id, number, title, is_done, user_name")
    .order("number");

  if (error) {
    throw new Error("error while fetching subjects");
  }

  return (
    <Table className="w-3/4 mx-auto max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">순번</TableHead>
          <TableHead className="text-center">주제</TableHead>
          <TableHead className="w-12 text-center">체크</TableHead>
          <TableHead className="w-14 text-center">한사람</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects?.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell className="text-center">{subject.number}</TableCell>
            <TableCell>{subject.title}</TableCell>
            <TableCell className="text-center">
              <Checkbox checked={subject.is_done} />
            </TableCell>
            <TableCell className="text-center">{subject.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
