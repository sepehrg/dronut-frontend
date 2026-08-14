import { CreateDonutData, Donut } from "@/types";
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
