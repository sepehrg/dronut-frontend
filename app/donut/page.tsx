"use client";

import { createDonut } from "@/api";
import { CreateDonutData } from "@/types";
import { useRouter } from "next/navigation";
import { useState, SubmitEvent } from "react";
import { getApiErrorMessage } from "../utils";

export default function DonutPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    const data: CreateDonutData = {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      is_available: formData.get("is_available") === "on",
    };

    try {
      await createDonut(data);
      router.push("/");
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  return (
    <div>
      <h2>Add donut</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Code</label>
          <input type="text" name="code" />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="price" />
        </div>
        <div>
          <label>Available?</label>
          <input type="checkbox" name="is_available" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
