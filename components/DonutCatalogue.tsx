"use client";

import { createOrder } from "@/api";
import { Donut, Order } from "@/types";
import { getApiErrorMessage } from "@/app/utils";
import { FormEvent, useMemo, useState } from "react";

type DonutCatalogueProps = {
  donuts: Donut[];
};

type Cart = Record<string, number>;

export default function DonutCatalogue({ donuts }: DonutCatalogueProps) {
  const [cart, setCart] = useState<Cart>({});
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartItems = useMemo(
    () =>
      donuts
        .filter((donut) => cart[donut.code])
        .map((donut) => ({ donut, quantity: cart[donut.code] })),
    [cart, donuts],
  );
  const subtotal = cartItems.reduce(
    (total, { donut, quantity }) => total + Number(donut.price) * quantity,
    0,
  );

  function setQuantity(donutCode: string, quantity: number) {
    setCart((currentCart) => {
      if (quantity < 1) {
        const remainingCart = { ...currentCart };
        delete remainingCart[donutCode];
        return remainingCart;
      }

      return { ...currentCart, [donutCode]: quantity };
    });
  }

  function addToCart(donutCode: string) {
    setPlacedOrder(null);
    setError(null);
    setQuantity(donutCode, (cart[donutCode] ?? 0) + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        donuts: cartItems.map(({ donut, quantity }) => ({
          donut_code: donut.code,
          quantity,
        })),
      });
      setPlacedOrder(order);
      setCart({});
    } catch (submissionError) {
      setError(getApiErrorMessage(submissionError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: "32px", width: "100%" }}>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {donuts.map((donut) => (
          <article key={donut.id} style={{ border: "1px solid #CCC", padding: "20px" }}>
            <h2>{donut.name}</h2>
            <small style={{ color: "gray" }}>Code: {donut.code}</small>
            <p>{donut.description}</p>
            <p>Price: ${donut.price}</p>
            <p>Available: {donut.is_available ? "Yes" : "No"}</p>
            <button
              type="button"
              disabled={!donut.is_available}
              onClick={() => addToCart(donut.code)}
            >
              {donut.is_available ? "Add to order" : "Unavailable"}
            </button>
          </article>
        ))}
      </div>

      <aside aria-live="polite" style={{ border: "1px solid #CCC", padding: "20px" }}>
        {placedOrder ? (
          <>
            <h2>Order placed</h2>
            <p>Your order has been received and is {placedOrder.status.toLowerCase()}.</p>
            <p>Order ID: {placedOrder.id}</p>
            <p>Total: ${placedOrder.total}</p>
            <button type="button" onClick={() => setPlacedOrder(null)}>
              Start another order
            </button>
          </>
        ) : cartItems.length === 0 ? (
          <>
            <h2>Your order</h2>
          <p>Your order is empty.</p>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Your order</h2>
            <ul style={{ display: "grid", gap: "12px", listStyle: "none", padding: 0 }}>
              {cartItems.map(({ donut, quantity }) => (
                <li key={donut.code} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span>{donut.name}</span>
                  <label>
                    Quantity
                    <input
                      min="1"
                      type="number"
                      value={quantity}
                      onChange={(event) => setQuantity(donut.code, Number(event.target.value))}
                      style={{ marginLeft: "8px", width: "56px" }}
                    />
                  </label>
                  <button type="button" onClick={() => setQuantity(donut.code, 0)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Placing order..." : "Place order"}
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
