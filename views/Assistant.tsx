import React, { useState, useEffect, useRef } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { Product } from '../types';
import { Input, Button, Card } from '../components/ui';
import { IconBot } from '../components/Icons';

interface AssistantProps {
  inventory: Product[];
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const Assistant: React.FC<AssistantProps> = ({ inventory }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hola, soy FerreBot. ¿En qué puedo ayudarte hoy con tu ferretería?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Mock sales context string
    const salesContext = "Las ventas de la semana han sido altas en la categoría de Herramientas, pero bajas en Plomería.";

    const response = await getGeminiResponse(userMsg, inventory, salesContext);

    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b border-slate-100 shadow-sm flex items-center gap-3">
         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <IconBot className="w-6 h-6" />
         </div>
         <div>
            <h2 className="font-bold text-slate-800">Asistente IA</h2>
            <p className="text-xs text-green-500 font-medium">En línea</p>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-ferre-orange text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none text-xs text-slate-500 italic animate-pulse">
              FerreBot está escribiendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-[70px] left-0 w-full p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
            <Input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder="Escribe tu consulta..."
                className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input}>Enviar</Button>
        </div>
      </div>
    </div>
  );
};
