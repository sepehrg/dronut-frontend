"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleClear() {
    setQuery("");
    router.push("/");
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedQuery = query.trim();

    if (!cleanedQuery) return;

    router.push(`/?query=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search donuts..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}
