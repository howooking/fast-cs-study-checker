import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./row";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

type SubjectsTableProps = {
  userName?: string;
  query: string;
  filter: "all" | "done" | "notDone";
};

export default async function SubjectsTable({
  userName,
  query,
  filter,
}: SubjectsTableProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: subjects, error: error1 } = await supabase
    .from("subjects")
    .select("id, number, title, is_done, user_name, link")
    .order("number");

  const searchedSubjects = !query
    ? subjects
    : subjects?.filter((subject) =>
        subject.title.toLowerCase().includes(query?.toLowerCase())
      );

  const filteredSearchedSubjects =
    filter === "all"
      ? searchedSubjects
      : filter === "done"
      ? searchedSubjects?.filter((subject) => subject.is_done)
      : searchedSubjects?.filter((subject) => !subject.is_done);

  if (error1) {
    throw new Error("error while fetching subjects");
  }
  return (
    <Table className="w-5/6 mx-auto max-w-4xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">순번</TableHead>
          <TableHead className="text-center">주제</TableHead>
          <TableHead className="w-12 text-center">체크</TableHead>
          <TableHead className="w-16 text-center">한사람</TableHead>
          <TableHead className="w-32 text-center">링크</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSearchedSubjects?.map((subject) => (
          <Row key={subject.id} subject={subject} userName={userName} />
        ))}
      </TableBody>
    </Table>
  );
}
