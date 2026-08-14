import { getDonuts } from "@/api";
import SearchForm from "@/components/SearchForm";
import { Donut } from "@/types";
import Link from "next/link";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({searchParams}: SearchPageProps) {
  const {query = "" } = await searchParams;

  const donuts = await getDonuts(query);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div style={{ height: "40px" }}>
          <Link href={"/donut"}>Add Donut</Link>
        </div>
        <h1>Donut list</h1>
        <div style={{padding: "20px", textAlign: "right"}}>
          <SearchForm />
        </div>
        <div style={{ display: "flex", gap: "40px" }}>
          {donuts.map((donut: Donut) => (
            <div
              key={donut.id}
              style={{ border: "1px solid #CCC", padding: "30px" }}
            >
              <p>Name: {donut.name}</p>
              <small style={{ color: "gray" }}>Code: {donut.code}</small>
              <p>Description: {donut.description}</p>
              <p>Price: {donut.price}</p>
              <p>Available: {donut.is_available ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
