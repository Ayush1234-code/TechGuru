import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function getStructuredAIResponse(system, user, fallback) {
  if (!client) return fallback;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: `${system} Return valid JSON only.` },
        { role: "user", content: user }
      ],
      temperature: 0.4
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI request failed:", error.message);
    return fallback;
  }
}
