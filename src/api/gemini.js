// escoge UNO de la lista
const MODEL = "gemini-1.5-flash";          // o "gemini-1.5-pro", etc.
const BASE  =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function askGemini(prompt) {
  const KEY = import.meta.env.VITE_GEMINI_KEY;
  const res = await fetch(`${BASE}?key=${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || res.statusText);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "…";
}
