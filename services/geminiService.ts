import { GoogleGenAI } from "@google/genai";

// Initialize the client strictly according to guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Generates a blog post introduction or paragraph based on a topic.
 * Uses gemini-2.5-flash for speed and efficiency.
 */
export const generateBlogIntro = async (topic: string, tone: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }

  try {
    const prompt = `Write a compelling, SEO-friendly blog post introduction (approx 100-150 words) about "${topic}". The tone should be ${tone}. Use HTML formatting for bolding key terms.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
};

/**
 * Summarizes a given text.
 */
export const summarizeText = async (text: string, length: 'short' | 'medium' | 'long'): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  try {
    const prompt = `Summarize the following text. The summary length should be ${length}. \n\nTEXT: ${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.5,
      }
    });

    return response.text || "Failed to summarize text.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to summarize text. Please try again later.");
  }
};

/**
 * Paraphrases a given text.
 */
export const paraphraseText = async (text: string, mode: 'standard' | 'fluent' | 'creative'): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  try {
    const prompt = `Paraphrase the following text. The mode should be ${mode}. Maintain the original meaning but change the wording. \n\nTEXT: ${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    return response.text || "Failed to paraphrase text.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to paraphrase text. Please try again later.");
  }
};

/**
 * Chat with AI.
 */
export const chatWithAi = async (message: string, history: any[]): Promise<string> => {
    if (!process.env.API_KEY) throw new Error("API Key is missing.");

    try {
        // Convert simplified history to Gemini format if needed, or just send last prompt for simple statutory
        // For stateless simple chat in this demo:
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helpful AI assistant on a tools website called SmartToolsZone. Answer the following user query concisely.\n\nUser: ${message}`,
        });
        return response.text || "I couldn't generate a response.";
    } catch (error) {
        console.error(error);
        throw new Error("AI Chat failed.");
    }
};

/**
 * Generate Image Caption.
 */
export const generateImageCaption = async (base64Image: string): Promise<string> => {
    if (!process.env.API_KEY) throw new Error("API Key is missing.");

    try {
        // base64Image is data:image/png;base64,.... we need to strip prefix
        const base64Data = base64Image.split(',')[1];
        const mimeType = base64Image.split(';')[0].split(':')[1];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: mimeType, data: base64Data } },
                    { text: "Generate a detailed SEO-friendly caption and a list of hashtags for this image." }
                ]
            }
        });
        return response.text || "Could not describe image.";
    } catch (error) {
        console.error(error);
        throw new Error("Image analysis failed.");
    }
};