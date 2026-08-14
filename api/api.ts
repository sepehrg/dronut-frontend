import { CreateDonutData, Donut } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getDonuts(): Promise<Donut[]> {
  return apiFetch<Donut[]>("/donuts/");
}

export async function createDonut(data: CreateDonutData): Promise<Donut> {
  return apiFetch<Donut>("/donuts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
