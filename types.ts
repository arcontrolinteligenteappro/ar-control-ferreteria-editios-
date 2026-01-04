export interface Product {
  id: string;
  name: string;
  sku: string; // Internal code
  barcode: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  location: string; // Aisle/Shelf
  supplier: string;
}

export interface Client {
  id: string;
  name: string;
  rfc: string;
  phone: string;
  email: string;
  type: 'General' | 'Mayorista';
}

export interface CashTransaction {
  id: string;
  type: 'income' | 'expense' | 'withdrawal' | 'initial';
  amount: number;
  description: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  date: string; // ISO string
  items: CartItem[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  clientName?: string;
  type: 'sale' | 'return' | 'quote';
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  POS = 'POS',
  INVENTORY = 'INVENTORY',
  REPORTS = 'REPORTS',
  ASSISTANT = 'ASSISTANT',
  CLIENTS = 'CLIENTS',
  CASH = 'CASH',
  SUPPLIERS = 'SUPPLIERS', // Placeholder for nav
  EMPLOYEES = 'EMPLOYEES', // Placeholder for nav
  PURCHASES = 'PURCHASES', // Placeholder for nav
}

export interface SalesStat {
  name: string;
  sales: number;
}

export interface CategoryStat {
  name: string;
  value: number;
}
