import React, { useState } from 'react';
import { CashTransaction } from '../types';
import { Card, Button, Input } from '../components/ui';
import { IconWallet, IconPlus } from '../components/Icons';

interface CashProps {
  transactions: CashTransaction[];
}

export const Cash: React.FC<CashProps> = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'movements'>('summary');

  const income = transactions.filter(t => t.type === 'income' || t.type === 'initial').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense' || t.type === 'withdrawal').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="h-full flex flex-col p-4 pb-24">
       <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Control de Caja</h2>
        <p className="text-slate-500 text-sm">Corte del día: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
         <Card className="bg-ferre-orange text-white border-none">
             <div className="text-xs opacity-80 uppercase font-bold">Total en Caja</div>
             <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
         </Card>
         <Card className="bg-slate-800 text-white border-none">
             <div className="text-xs opacity-80 uppercase font-bold">Gastos / Retiros</div>
             <div className="text-2xl font-bold text-red-300">-${expense.toFixed(2)}</div>
         </Card>
      </div>

      <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('summary')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'summary' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Resumen</button>
          <button onClick={() => setActiveTab('movements')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'movements' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Movimientos</button>
      </div>

      {activeTab === 'summary' && (
          <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-between">
                  <span>Ingreso de Efectivo</span>
                  <IconPlus className="w-5 h-5" />
              </Button>
              <Button variant="secondary" className="w-full justify-between">
                  <span>Registrar Gasto</span>
                  <IconPlus className="w-5 h-5" />
              </Button>
              <Button variant="primary" className="w-full mt-6 py-4 text-lg">
                  Realizar Corte de Caja
              </Button>
          </div>
      )}

      {activeTab === 'movements' && (
          <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
              {transactions.map(t => (
                  <div key={t.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100">
                      <div>
                          <div className="font-medium text-slate-800">{t.description}</div>
                          <div className="text-xs text-slate-400 capitalize">{t.type}</div>
                      </div>
                      <div className={`font-bold ${t.type === 'income' || t.type === 'initial' ? 'text-green-600' : 'text-red-500'}`}>
                          {t.type === 'income' || t.type === 'initial' ? '+' : '-'}${t.amount}
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};
