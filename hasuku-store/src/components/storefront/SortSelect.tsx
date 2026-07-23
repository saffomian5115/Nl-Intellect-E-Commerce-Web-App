"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <select
      className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
      defaultValue={currentSort ?? "newest"}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="newest">Neueste</option>
      <option value="price_asc">Preis aufsteigend</option>
      <option value="price_desc">Preis absteigend</option>
      <option value="name">Name A-Z</option>
    </select>
  );
}
