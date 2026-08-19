import { getDonuts } from "@/api";
import DonutCatalogue from "@/components/DonutCatalogue";
import SearchForm from "@/components/SearchForm";
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
        <div style={{ display: "flex", gap: "16px", height: "40px" }}>
          <Link href="/donut">Add Donut</Link>
          <Link href="/orders">View orders</Link>
        </div>
        <h1>Donut list</h1>
        <div style={{padding: "20px", textAlign: "right"}}>
          <SearchForm />
        </div>
        <DonutCatalogue donuts={donuts} />
      </main>
    </div>
  );
}
