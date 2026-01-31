
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSecurityAdvice(stats: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these API security stats and provide a brief, professional recommendation for the developer dashboard. 
      Stats: Total Revenue from Penalties: $${stats.totalRevenue}, Active Keys: ${stats.activeKeys}, Penalties Today: ${stats.penaltiesApplied}.
      Focus on risk mitigation and monetization efficiency. Keep it under 100 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ensure your penalty multipliers are aligned with endpoint criticality to maximize revenue while maintaining security.";
  }
}
