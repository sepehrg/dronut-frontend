import { getDonuts } from "@/api/api";
import { Donut } from "@/types";
import Link from "next/link";

export default async function Home() {
  const donuts = await getDonuts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div style={{ height: "40px" }}>
          <Link href={"/admin"}>Add Donut</Link>
        </div>
        <h1>Donut list</h1>
        {donuts.map((donut: Donut) => (
          <div>{donut.name}</div>
        ))}
      </main>
    </div>
  );
}
