import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SubjectsTable from "@/components/table/subjects-table";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import SubjectsTableSkeleton from "@/components/table/subject-table-skeleton";

export default async function Home() {
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
      <div>TODO : filtering</div>
      <div>TODO : search</div>
      <Suspense fallback={<SubjectsTableSkeleton />}>
        <SubjectsTable userName={user?.user_metadata.name} />
      </Suspense>
    </>
  );
}
