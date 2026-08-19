"use client";

import { getApiErrorMessage } from "@/app/utils";
import { dispatchOrder } from "@/api";
import { Order } from "@/types";
import { useState } from "react";

type OrdersListProps = {
  initialOrders: Order[];
};

export default function OrdersList({ initialOrders }: OrdersListProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [dispatchingOrderId, setDispatchingOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDispatch(orderId: string) {
    setError(null);
    setDispatchingOrderId(orderId);

    try {
      const dispatchedOrder = await dispatchOrder(orderId);
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === dispatchedOrder.id ? dispatchedOrder : order,
        ),
      );
    } catch (dispatchError) {
      setError(getApiErrorMessage(dispatchError));
    } finally {
      setDispatchingOrderId(null);
    }
  }

  if (orders.length === 0) {
    return <p>No orders have been placed yet.</p>;
  }

  return (
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
          {order.status === "CREATED" && (
            <button
              type="button"
              disabled={dispatchingOrderId === order.id}
              onClick={() => handleDispatch(order.id)}
            >
              {dispatchingOrderId === order.id ? "Dispatching..." : "Dispatch order"}
            </button>
          )}
        </article>
      ))}
      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
