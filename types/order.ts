export type OrderStatus = "CREATED" | "DISPATCHED";

export interface OrderItem {
  donut_code: string;
  quantity: number;
  unit_price: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  total: string;
  items: OrderItem[];
}

export interface OrderSelection {
  donut_code: string;
  quantity: number;
}

export interface CreateOrderData {
  donuts: OrderSelection[];
}
