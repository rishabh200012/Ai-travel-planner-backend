import { GoogleGenAI } from "@google/genai";
console.log("ai key", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateTripPlan = async ({
  destination,
  days,
  budgetType,
  interests,
}) => {
  const prompt = `
Generate a travel itinerary in JSON format.

Destination: ${destination}
Days: ${days}
Budget: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

Format:

{
  "itinerary":[
    {
      "day":1,
      "activities":[]
    }
  ],
  "estimatedBudget":{
    "hotel":0,
    "food":0,
    "transport":0,
    "activities":0,
    "total":0
  },
  "hotels":[]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

export const regenerateSingleDay = async ({
  destination,
  day,
  budgetType,
  interests,
}) => {
  const prompt = `
Generate itinerary ONLY for Day ${day}.

Destination: ${destination}
Budget: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

Format:

{
  "day": ${day},
  "activities": [
    "activity 1",
    "activity 2",
    "activity 3"
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

export const generatePackingList = async ({ destination, days, interests }) => {
  const prompt = `
Generate a travel packing list.

Destination: ${destination}
Duration: ${days} days
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

Format:

{
  "items": [
    "item 1",
    "item 2",
    "item 3"
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};
