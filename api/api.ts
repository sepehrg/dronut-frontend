import { CreateDonutData, Donut } from "@/types";
import { apiFetch } from "./client";


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
