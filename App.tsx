import React, { useState } from 'react';
import { Product, AppView, CartItem, Client, Sale } from './types';
import { INITIAL_PRODUCTS, INITIAL_CLIENTS, MOCK_CASH_TRANSACTIONS } from './constants';
import { POS } from './views/POS';
import { Inventory } from './views/Inventory';
import { Reports } from './views/Reports';
import { Assistant } from './views/Assistant';
import { Dashboard } from './views/Dashboard';
import { Clients } from './views/Clients';
import { Cash } from './views/Cash';
import { IconHome, IconShoppingCart, IconPackage, IconBarChart, IconBot, IconMenu } from './components/Icons';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  
  // State for modules not fully implemented in this demo but required for navigation
  const [sales, setSales] = useState<Sale[]>([]);

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleAddClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const handleSaleComplete = (items: CartItem[], total: number, type: 'sale' | 'return' | 'quote') => {
    if (type === 'sale') {
        // Decrease stock logic
        setProducts(prev => prev.map(p => {
            const soldItem = items.find(i => i.id === p.id);
            if (soldItem) {
                return { ...p, stock: p.stock - soldItem.quantity };
            }
            return p;
        }));
    } else if (type === 'return') {
        // Increase stock logic
        setProducts(prev => prev.map(p => {
            const returnedItem = items.find(i => i.id === p.id);
            if (returnedItem) {
                return { ...p, stock: p.stock + returnedItem.quantity };
            }
            return p;
        }));
    }
    // Record sale/quote logic would go here
  };

  const renderView = () => {
    switch(currentView) {
      case AppView.POS:
        return <POS products={products} onCompleteSale={handleSaleComplete} />;
      case AppView.INVENTORY:
        return <Inventory products={products} onAddProduct={handleAddProduct} />;
      case AppView.REPORTS:
        return <Reports />;
      case AppView.ASSISTANT:
        return <Assistant inventory={products} />;
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case AppView.CLIENTS:
        return <Clients clients={clients} onAddClient={handleAddClient} />;
      case AppView.CASH:
        return <Cash transactions={MOCK_CASH_TRANSACTIONS} />;
      default:
        // Fallback for placeholder modules (Suppliers, Employees, Purchases)
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-4xl mb-4">🚧</div>
                <h2 className="text-xl font-bold text-slate-800">Módulo en Construcción</h2>
                <p className="text-slate-500 mt-2">Esta funcionalidad estará disponible pronto en FERRECLIC.</p>
                <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mt-6 text-ferre-orange font-medium">Volver al Menú</button>
            </div>
        );
    }
  };

  const NavItem = ({ view, icon, label }: { view: AppView, icon: React.ReactNode, label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => setCurrentView(view)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-ferre-orange' : 'text-slate-400'}`}
      >
        <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
          {icon}
        </div>
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden max-w-md mx-auto shadow-2xl relative">
      
      {/* App Header (Sticky) */}
      <header className="bg-ferre-dark text-white px-4 py-3 shadow-md flex justify-between items-center z-20">
        <div className="flex items-center gap-2" onClick={() => setCurrentView(AppView.DASHBOARD)}>
            <div className="w-8 h-8 bg-ferre-orange rounded-lg flex items-center justify-center font-bold text-white">F</div>
            <h1 className="text-lg font-bold tracking-tight">FERRECLIC</h1>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">ONLINE</span>
            <button className="text-slate-300">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs border border-slate-700">US</div>
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative z-0">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-[65px] bg-white border-t border-slate-200 flex justify-between items-center px-2 z-30">
        <NavItem view={AppView.POS} icon={<IconShoppingCart className="w-6 h-6"/>} label="Venta" />
        <NavItem view={AppView.INVENTORY} icon={<IconPackage className="w-6 h-6"/>} label="Stock" />
        <div className="relative -top-6">
            <button 
                onClick={() => setCurrentView(AppView.DASHBOARD)}
                className={`w-14 h-14 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white transition-all ${currentView === AppView.DASHBOARD ? 'bg-ferre-dark scale-110' : 'bg-ferre-orange'}`}
            >
                <IconMenu className="w-7 h-7" />
            </button>
        </div>
        <NavItem view={AppView.REPORTS} icon={<IconBarChart className="w-6 h-6"/>} label="Reportes" />
        <NavItem view={AppView.ASSISTANT} icon={<IconBot className="w-6 h-6"/>} label="IA" />
      </nav>
    </div>
  );
}

export default App;
