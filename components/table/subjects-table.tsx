import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./row";

type SubjectsTableProps = {
  subjects:
    | {
        id: string;
        number: number;
        title: string;
        is_done: boolean;
        user_name: string | null;
        link: string | null;
      }[]
    | null;
};

export default function SubjectsTable({ subjects }: SubjectsTableProps) {
  return (
    <Table className="w-3/4 mx-auto max-w-3xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">순번</TableHead>
          <TableHead className="text-center">주제</TableHead>
          <TableHead className="w-12 text-center">체크</TableHead>
          <TableHead className="w-14 text-center">한사람</TableHead>
          <TableHead className="w-20 text-center">링크</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects?.map((subject) => (
          <Row key={subject.id} subject={subject} />
        ))}
      </TableBody>
    </Table>
  );
}
