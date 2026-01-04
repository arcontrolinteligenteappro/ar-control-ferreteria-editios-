import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Card } from '../components/ui';
import { MOCK_SALES_DATA, CATEGORY_DATA } from '../constants';

export const Reports = () => {
  return (
    <div className="h-full overflow-y-auto p-4 pb-24 no-scrollbar space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Reportes Claros</h2>
      
      {/* Sales Chart */}
      <section>
        <h3 className="text-lg font-semibold text-slate-700 mb-3">Ventas Semanales</h3>
        <Card className="h-64 pt-6 pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_SALES_DATA}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                cursor={{fill: '#F1F5F9'}} 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="sales" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Category Breakdown */}
      <section>
        <h3 className="text-lg font-semibold text-slate-700 mb-3">Ventas por Categoría</h3>
        <Card className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={CATEGORY_DATA}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#F97316', '#0F172A', '#0284c7', '#94a3b8'][index % 4]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center text-xs text-slate-600 mt-2">
                {CATEGORY_DATA.map((c, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#F97316', '#0F172A', '#0284c7', '#94a3b8'][i % 4] }}></span>
                        {c.name}
                    </div>
                ))}
            </div>
        </Card>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-ferre-dark text-white border-none">
            <div className="text-slate-400 text-xs uppercase font-bold mb-1">Caja Chica</div>
            <div className="text-2xl font-bold">$1,250</div>
        </Card>
        <Card className="bg-ferre-orange text-white border-none">
            <div className="text-orange-100 text-xs uppercase font-bold mb-1">Venta Hoy</div>
            <div className="text-2xl font-bold">$5,890</div>
        </Card>
        <Card>
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Cuentas x Cobrar</div>
            <div className="text-xl font-bold text-slate-800">$12,400</div>
        </Card>
        <Card>
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Bajo Stock</div>
            <div className="text-xl font-bold text-red-500">3 prods</div>
        </Card>
      </div>
    </div>
  );
};
