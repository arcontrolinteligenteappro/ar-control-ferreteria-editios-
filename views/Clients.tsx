import React, { useState } from 'react';
import { Client } from '../types';
import { IconSearch, IconPlus, IconUser } from '../components/Icons';
import { Card, Input, Button } from '../components/ui';

interface ClientsProps {
  clients: Client[];
  onAddClient: (client: Client) => void;
}

export const Clients: React.FC<ClientsProps> = ({ clients, onAddClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({ name: '', rfc: '', phone: '', email: '', type: 'General' });

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!newClient.name) return;
    onAddClient({ ...newClient, id: Date.now().toString() } as Client);
    setIsAdding(false);
    setNewClient({ name: '', rfc: '', phone: '', email: '', type: 'General' });
  };

  if (isAdding) {
    return (
      <div className="p-4 space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-slate-800">Nuevo Cliente</h2>
        <Card className="space-y-4">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre Completo</label>
                <Input value={newClient.name || ''} onChange={e => setNewClient({...newClient, name: e.target.value})} placeholder="Ej. Juan Pérez" />
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">RFC</label>
                <Input value={newClient.rfc || ''} onChange={e => setNewClient({...newClient, rfc: e.target.value})} placeholder="XAXX010101000" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Teléfono</label>
                    <Input value={newClient.phone || ''} onChange={e => setNewClient({...newClient, phone: e.target.value})} placeholder="55..." />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Tipo</label>
                    <Input value={newClient.type || ''} onChange={e => setNewClient({...newClient, type: e.target.value as any})} placeholder="General" />
                </div>
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <Input value={newClient.email || ''} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="cliente@email.com" />
            </div>
        </Card>
        <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setIsAdding(false)}>Cancelar</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 pb-24">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">Directorio Clientes</h2>
        <Button variant="primary" onClick={() => setIsAdding(true)} className="w-10 h-10 rounded-full !p-0">
          <IconPlus className="w-6 h-6" />
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          icon={<IconSearch className="w-5 h-5" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o RFC..."
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar">
        {filtered.map(c => (
            <Card key={c.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <IconUser className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.type} • {c.rfc}</div>
                </div>
                <Button variant="ghost" className="!px-2 text-ferre-orange">Ver</Button>
            </Card>
        ))}
      </div>
    </div>
  );
};
