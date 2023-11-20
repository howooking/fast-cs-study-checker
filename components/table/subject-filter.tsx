"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Search from "./search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SubjectFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-5/6 mx-auto max-w-4xl flex gap-2 items-center justify-between my-10">
      <Select
        onValueChange={(value) => handleSelect(value)}
        defaultValue={searchParams.get("filter")?.toString()}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="모두" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모두</SelectItem>
          <SelectItem value="done">완료</SelectItem>
          <SelectItem value="notDone">미완료</SelectItem>
        </SelectContent>
      </Select>
      <Search />
    </div>
  );
}
