export interface Donut {
  id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  is_available: boolean;
}

export interface CreateDonutData {
  name: string;
  code: string;
  description: string;
  price: string;
  is_available: boolean;
}