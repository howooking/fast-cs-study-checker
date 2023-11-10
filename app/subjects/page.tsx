import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SubjectsTable from "@/components/table/subjects-table";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import SubjectsTableSkeleton from "@/components/table/subject-table-skeleton";
import SubjectFilter from "@/components/table/subject-filter";

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams?: { query?: string; filter?: "all" | "done" | "notDone" };
}) {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "all";
  const {
    data: { user },
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <SubjectFilter userName={user?.user_metadata.name} />
      <Suspense fallback={<SubjectsTableSkeleton />}>
        <SubjectsTable
          userName={user?.user_metadata.name}
          query={query}
          filter={filter}
        />
      </Suspense>
    </>
  );
}
