import { Product, Client, CashTransaction } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Martillo de Uña 16oz',
    sku: 'HER-MAN-001',
    barcode: '7501234567890',
    price: 185.50,
    cost: 120.00,
    stock: 25,
    category: 'Herramientas',
    location: 'Pasillo 1, Estante A',
    supplier: 'Truper Tools',
  },
  {
    id: '2',
    name: 'Taladro Percutor 1/2"',
    sku: 'HER-ELE-055',
    barcode: '7509876543210',
    price: 1250.00,
    cost: 850.00,
    stock: 8,
    category: 'Eléctricos',
    location: 'Pasillo 2, Vitrina',
    supplier: 'Bosch Mex',
  },
  {
    id: '3',
    name: 'Juego Desarmadores (6 pzas)',
    sku: 'HER-MAN-012',
    barcode: '7505555555555',
    price: 220.00,
    cost: 140.00,
    stock: 15,
    category: 'Herramientas',
    location: 'Pasillo 1, Estante B',
    supplier: 'Urrea',
  },
  {
    id: '4',
    name: 'Pintura Vinílica Blanca 19L',
    sku: 'CON-PIN-100',
    barcode: '7501112223334',
    price: 1100.00,
    cost: 750.00,
    stock: 12,
    category: 'Construcción',
    location: 'Bodega 1',
    supplier: 'Comex',
  },
  {
    id: '5',
    name: 'Tubo PVC 4" x 3m',
    sku: 'PLO-TUB-004',
    barcode: '7504443332221',
    price: 280.00,
    cost: 190.00,
    stock: 50,
    category: 'Plomería',
    location: 'Patio Trasero',
    supplier: 'Amanco',
  },
];

export const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'Juan Pérez', rfc: 'XAXX010101000', phone: '5512345678', email: 'juan@gmail.com', type: 'General' },
  { id: '2', name: 'Constructora del Norte', rfc: 'CON900101AAA', phone: '8183000000', email: 'contacto@cdn.com', type: 'Mayorista' },
];

export const MOCK_CASH_TRANSACTIONS: CashTransaction[] = [
  { id: '1', type: 'initial', amount: 1000, description: 'Fondo inicial', date: new Date().toISOString() },
  { id: '2', type: 'expense', amount: 150, description: 'Pago de comida', date: new Date().toISOString() },
];

export const MOCK_SALES_DATA = [
  { name: 'Lun', sales: 4000 },
  { name: 'Mar', sales: 3000 },
  { name: 'Mié', sales: 2000 },
  { name: 'Jue', sales: 2780 },
  { name: 'Vie', sales: 5890 },
  { name: 'Sáb', sales: 6390 },
  { name: 'Dom', sales: 3490 },
];

export const CATEGORY_DATA = [
  { name: 'Herramientas', value: 400 },
  { name: 'Plomería', value: 300 },
  { name: 'Eléctricos', value: 300 },
  { name: 'Construcción', value: 200 },
];
