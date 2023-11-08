import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Database } from "@/lib/database.types";
import SubjectsTable from "@/components/table/subjects-table";

export default async function Home() {
  const { data: subjects, error } = await createServerComponentClient<Database>(
    {
      cookies,
    }
  )
    .from("subjects")
    .select("id, number, title, is_done, user_name, link")
    .order("number");

  if (error) {
    throw new Error("error while fetching subjects");
  }

  return (
    <>
      <div>todo: filtering</div>
      <SubjectsTable subjects={subjects} />
    </>
  );
}
