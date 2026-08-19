import { getOrders } from "@/api";
import OrdersList from "@/components/OrdersList";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black">
        <Link href="/">Back to donut catalogue</Link>
        <h1>Orders</h1>

        <OrdersList initialOrders={orders} />
      </main>
    </div>
  );
}
