import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export const getGeminiResponse = async (
  prompt: string, 
  inventoryContext: Product[],
  salesSummary: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Error: API Key no configurada.";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Prepare a context summary to help the AI understand the store's state
    const inventorySummary = inventoryContext.slice(0, 20).map(p => 
      `- ${p.name} (Stock: ${p.stock}, Precio: ${formatCurrency(p.price)}, Ubicación: ${p.location})`
    ).join('\n');

    const systemInstruction = `
      Eres 'FerreBot', un asistente experto en gestión de ferreterías para la app FERRECLIC.
      Tu objetivo es ayudar al dueño de la ferretería a vender más, organizar su inventario y resolver dudas técnicas.
      
      Tienes acceso a un resumen del inventario actual:
      ${inventorySummary}
      
      Y un resumen de ventas reciente: ${salesSummary}

      Responde de manera concisa, profesional y útil. Si te piden descripciones de productos, hazlas atractivas.
      Si te piden consejos de negocio, básate en principios de retail ferretero.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, hubo un error al conectar con el asistente inteligente.";
  }
};
