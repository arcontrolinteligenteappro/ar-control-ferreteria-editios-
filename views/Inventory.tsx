import React, { useState } from 'react';
import { Product } from '../types';
import { IconSearch, IconPlus, IconScan } from '../components/Icons';
import { Card, Input, Button } from '../components/ui';

interface InventoryProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ products, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    barcode: '',
    price: 0,
    cost: 0,
    stock: 0,
    category: 'General',
    location: '',
    supplier: ''
  });

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    onAddProduct({
      ...newProduct,
      id: Date.now().toString(),
    } as Product);
    
    setIsAdding(false);
    setNewProduct({
        name: '', sku: '', barcode: '', price: 0, cost: 0, stock: 0, category: 'General', location: '', supplier: ''
    });
  };

  if (isAdding) {
    return (
      <div className="p-4 pb-24 overflow-y-auto h-full space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-slate-800">Nuevo Producto</h2>
        
        <Card className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Nombre</label>
            <Input value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Ej. Martillo" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Precio Venta</label>
                <Input type="number" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} placeholder="0.00" />
             </div>
             <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Costo</label>
                <Input type="number" value={newProduct.cost || ''} onChange={e => setNewProduct({...newProduct, cost: parseFloat(e.target.value)})} placeholder="0.00" />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Stock</label>
                <Input type="number" value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} placeholder="0" />
             </div>
             <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Ubicación</label>
                <Input value={newProduct.location || ''} onChange={e => setNewProduct({...newProduct, location: e.target.value})} placeholder="Pasillo A" />
             </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Código Barras</label>
            <div className="flex gap-2">
                <Input className="flex-1" value={newProduct.barcode || ''} onChange={e => setNewProduct({...newProduct, barcode: e.target.value})} placeholder="Scan..." />
                <Button variant="secondary" onClick={() => setNewProduct({...newProduct, barcode: Math.floor(Math.random()*1000000000).toString()})}>
                    <IconScan className="w-5 h-5"/>
                </Button>
            </div>
          </div>
          
          <div>
             <label className="text-xs font-semibold text-slate-500 uppercase">Proveedor</label>
             <Input value={newProduct.supplier || ''} onChange={e => setNewProduct({...newProduct, supplier: e.target.value})} placeholder="Nombre Proveedor" />
          </div>
        </Card>

        <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setIsAdding(false)} className="flex-1">Cancelar</Button>
            <Button variant="primary" onClick={handleSave} className="flex-1">Guardar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">Inventario</h2>
        <Button variant="primary" onClick={() => setIsAdding(true)} className="w-10 h-10 rounded-full !p-0">
          <IconPlus className="w-6 h-6" />
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          icon={<IconSearch className="w-5 h-5" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, SKU o ubicación..."
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-20 no-scrollbar">
        {filtered.map(p => (
            <Card key={p.id} className="relative overflow-hidden">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-slate-800">{p.name}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{p.category} • {p.supplier}</p>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-ferre-orange">${p.price.toFixed(2)}</div>
                        <div className="text-xs text-slate-400">Costo: ${p.cost.toFixed(2)}</div>
                    </div>
                </div>
                <div className="mt-3 flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                         <span className="text-sm font-medium text-slate-600">Stock: {p.stock}</span>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                        📍 {p.location || 'Sin Ubicación'}
                    </div>
                </div>
            </Card>
        ))}
        {filtered.length === 0 && (
             <div className="text-center text-slate-400 mt-10">No hay productos que coincidan.</div>
        )}
      </div>
    </div>
  );
};
