import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { IconSearch, IconScan, IconTrash, IconPlus } from '../components/Icons';
import { Button, Card, Input } from '../components/ui';

interface POSProps {
  products: Product[];
  onCompleteSale: (items: CartItem[], total: number, type: 'sale' | 'return' | 'quote') => void;
}

export const POS: React.FC<POSProps> = ({ products, onCompleteSale }) => {
  const [mode, setMode] = useState<'sale' | 'return' | 'quote'>('sale');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.barcode.includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearchTerm(''); // Clear search for next scan
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onCompleteSale(cart, cartTotal, mode);
    setCart([]);
    setShowCheckout(false);
    
    let message = '¡Venta realizada con éxito!';
    if (mode === 'quote') message = '¡Presupuesto guardado!';
    if (mode === 'return') message = '¡Devolución procesada!';
    
    alert(message);
  };

  // Simulate scanning a random product
  const simulateScan = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (randomProduct) {
      setSearchTerm(randomProduct.barcode);
    }
  };

  if (showCheckout) {
    return (
      <div className="h-full flex flex-col p-4 space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800">
            {mode === 'sale' ? 'Finalizar Venta' : mode === 'quote' ? 'Guardar Presupuesto' : 'Devolución'}
        </h2>
        <Card className="flex-1 overflow-y-auto">
          <h3 className="font-semibold text-slate-600 mb-2">Resumen</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-sm">x{item.quantity} {item.name}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-ferre-orange">${cartTotal.toFixed(2)}</span>
          </div>
        </Card>
        
        {mode === 'sale' && (
            <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="h-14" onClick={handleCheckout}>Efectivo</Button>
                <Button variant="secondary" className="h-14" onClick={handleCheckout}>Tarjeta</Button>
            </div>
        )}
        {mode !== 'sale' && (
            <Button variant="primary" className="h-14" onClick={handleCheckout}>
                {mode === 'quote' ? 'Guardar PDF' : 'Confirmar Devolución'}
            </Button>
        )}

        <Button variant="ghost" onClick={() => setShowCheckout(false)}>Volver al carrito</Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      
      {/* Mode Selector */}
      <div className="bg-slate-200 p-1 rounded-lg flex text-xs font-medium">
        <button 
            className={`flex-1 py-1.5 rounded-md transition-all ${mode === 'sale' ? 'bg-white text-ferre-orange shadow-sm' : 'text-slate-500'}`}
            onClick={() => setMode('sale')}
        >
            VENTA
        </button>
        <button 
            className={`flex-1 py-1.5 rounded-md transition-all ${mode === 'return' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-500'}`}
            onClick={() => setMode('return')}
        >
            DEVOLUCIÓN
        </button>
        <button 
            className={`flex-1 py-1.5 rounded-md transition-all ${mode === 'quote' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
            onClick={() => setMode('quote')}
        >
            PRESUPUESTO
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <Input 
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={mode === 'return' ? "Buscar venta o producto..." : "Buscar producto, SKU o escanear..."}
          icon={<IconSearch className="w-5 h-5" />}
        />
        <Button variant="secondary" onClick={simulateScan}>
          <IconScan className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Results (Overlay/Inline) */}
      {filteredProducts.length > 0 && (
        <div className="absolute top-32 left-4 right-4 z-10 bg-white shadow-xl rounded-xl border border-slate-200 max-h-60 overflow-y-auto">
          {filteredProducts.map(p => (
            <div 
              key={p.id} 
              className="p-3 border-b border-slate-100 hover:bg-slate-50 flex justify-between items-center active:bg-orange-50"
              onClick={() => addToCart(p)}
            >
              <div>
                <div className="font-medium text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-500">Stock: {p.stock} | {p.location}</div>
              </div>
              <div className="font-bold text-ferre-orange">${p.price}</div>
            </div>
          ))}
        </div>
      )}

      {/* Cart List */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-20 no-scrollbar">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <IconSearch className="w-16 h-16 mb-2 opacity-20" />
            <p className="font-medium">
                {mode === 'sale' ? 'Carrito vacío' : mode === 'quote' ? 'Presupuesto vacío' : 'Sin artículos para devolver'}
            </p>
            <p className="text-sm">Escanea o busca un producto</p>
          </div>
        ) : (
          cart.map(item => (
            <Card key={item.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-medium text-slate-800 line-clamp-1">{item.name}</span>
                <span className={`font-bold ${mode === 'return' ? 'text-red-500' : 'text-slate-900'}`}>
                    {mode === 'return' ? '-' : ''}${ (item.price * item.quantity).toFixed(2) }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-slate-600 active:scale-95">-</button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-ferre-orange active:scale-95">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-full">
                  <IconTrash className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Bottom Total & Pay */}
      <div className="fixed bottom-[80px] left-4 right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <div className="text-sm text-slate-400">Total {mode === 'quote' ? 'Estimado' : ''}</div>
          <div className="text-2xl font-bold">${cartTotal.toFixed(2)}</div>
        </div>
        <Button 
          variant="primary" 
          disabled={cart.length === 0} 
          onClick={() => setShowCheckout(true)}
          className={`px-6 shadow-lg ${mode === 'return' ? 'bg-red-500 hover:bg-red-600' : mode === 'quote' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          {mode === 'sale' ? 'Cobrar' : mode === 'quote' ? 'Guardar' : 'Procesar'}
        </Button>
      </div>
    </div>
  );
};
