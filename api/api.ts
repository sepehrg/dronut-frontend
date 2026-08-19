import { CreateDonutData, CreateOrderData, Donut, Order } from "@/types";
import { apiFetch } from "./client";

export const getDonuts = async (query: string): Promise<Donut[]> => {
  const cleanedQuery = query?.trim();

  const url = cleanedQuery
    ? `/donuts/?query=${encodeURIComponent(cleanedQuery)}`
    : "/donuts/";

  return apiFetch<Donut[]>(url);
};

export const createDonut = async (data: CreateDonutData): Promise<Donut> => {
  return apiFetch<Donut>("/donuts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getOrders = async (): Promise<Order[]> => {
  return apiFetch<Order[]>("/orders/");
};

export const getOrder = async (orderId: string): Promise<Order> => {
  return apiFetch<Order>(`/orders/${orderId}/`);
};

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  return apiFetch<Order>("/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const dispatchOrder = async (orderId: string): Promise<Order> => {
  return apiFetch<Order>(`/orders/${orderId}/dispatch/`, {
    method: "POST",
  });
};
