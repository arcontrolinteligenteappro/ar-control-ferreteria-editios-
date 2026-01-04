import React from 'react';
import { AppView } from '../types';
import { IconShoppingCart, IconPackage, IconUser, IconWallet, IconTruck, IconBadge, IconBarChart, IconBot, IconSettings } from '../components/Icons';
import { Card } from '../components/ui';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const menuItems = [
    { label: 'Venta / POS', icon: <IconShoppingCart className="w-6 h-6" />, view: AppView.POS, color: 'bg-orange-100 text-orange-600' },
    { label: 'Inventario', icon: <IconPackage className="w-6 h-6" />, view: AppView.INVENTORY, color: 'bg-blue-100 text-blue-600' },
    { label: 'Clientes', icon: <IconUser className="w-6 h-6" />, view: AppView.CLIENTS, color: 'bg-green-100 text-green-600' },
    { label: 'Caja', icon: <IconWallet className="w-6 h-6" />, view: AppView.CASH, color: 'bg-purple-100 text-purple-600' },
    { label: 'Proveedores', icon: <IconTruck className="w-6 h-6" />, view: AppView.SUPPLIERS, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Empleados', icon: <IconBadge className="w-6 h-6" />, view: AppView.EMPLOYEES, color: 'bg-pink-100 text-pink-600' },
    { label: 'Reportes', icon: <IconBarChart className="w-6 h-6" />, view: AppView.REPORTS, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Asistente IA', icon: <IconBot className="w-6 h-6" />, view: AppView.ASSISTANT, color: 'bg-teal-100 text-teal-600' },
    { label: 'Config', icon: <IconSettings className="w-6 h-6" />, view: AppView.DASHBOARD, color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Panel de Control</h2>
        <p className="text-slate-500 text-sm">Gestiona tu ferretería desde un solo lugar</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => onNavigate(item.view)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95"
          >
            <div className={`p-3 rounded-full mb-3 ${item.color}`}>
              {item.icon}
            </div>
            <span className="font-medium text-slate-700 text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <Card className="mt-6 bg-gradient-to-br from-ferre-dark to-slate-800 text-white border-none">
         <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
             <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Estado del Sistema</span>
         </div>
         <div className="flex justify-between items-end">
             <div>
                 <div className="text-2xl font-bold">En Línea</div>
                 <div className="text-xs text-slate-400">Sincronizado hace 2 min</div>
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-400">Sucursal</div>
                <div className="font-medium">Matriz Centro</div>
             </div>
         </div>
      </Card>
    </div>
  );
};
