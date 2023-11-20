import { Suspense } from "react";
import { cookies } from "next/headers";
import SubjectsTable from "@/components/table/subjects-table";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import SubjectsTableSkeleton from "@/components/table/subject-table-skeleton";
import SubjectFilter from "@/components/table/subject-filter";
import { createClient } from "@/utils/supabase/server";

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams?: { query?: string; filter?: "all" | "done" | "notDone" };
}) {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "all";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from("profiles")
    .select("id, user_name, avatar_url")
    .eq("id", session?.user.id as string)
    .single();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <SubjectFilter />
      <Suspense fallback={<SubjectsTableSkeleton />}>
        <SubjectsTable query={query} filter={filter} />
      </Suspense>
    </>
  );
}
