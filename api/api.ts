const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDonuts() {
  const response = await fetch(`${API_URL}/donuts`);

  if (!response.ok) {
    throw new Error("Failed to fetch donuts");
  }

  return response.json();
}
