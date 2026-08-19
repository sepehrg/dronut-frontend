import { getOrders } from "@/api";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black">
        <Link href="/">Back to donut catalogue</Link>
        <h1>Orders</h1>

        {orders.length === 0 ? (
          <p>No orders have been placed yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order) => (
              <article key={order.id} style={{ border: "1px solid #CCC", padding: "20px" }}>
                <h2>Order {order.id}</h2>
                <p>Status: {order.status}</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.donut_code}>
                      {item.quantity} × {item.donut_code} at ${item.unit_price}
                    </li>
                  ))}
                </ul>
                <p>Total: ${order.total}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
