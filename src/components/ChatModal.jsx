import { useEffect, useState } from "react";
import { askGemini } from "../api/gemini";

export default function ChatModal({ pokemon, onClose }) {
  /* estado local */
  const [detail,  setDetail]  = useState(null);   // habilidades, moves, stats
  const [msg,     setMsg]     = useState("");
  const [history, setHistory] = useState([]);
const [thinking, setThinking] = useState(false);

  /* ────── 1. Cargar detalle SOLO una vez ────── */
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((r) => r.json())
      .then((d) =>
        setDetail({
          abilities: d.abilities.map((a) => a.ability.name),
          moves:     d.moves.map((m) => m.move.name),
          stats:     d.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        })
      )
      .catch(console.error);
  }, [pokemon.id]);

  /* ────── 2. Construir prompt seguro ────── */
  const basePrompt = detail
    ? `Eres ${pokemon.name}.
Habilidades: ${detail.abilities.join(", ")}
Movimientos: ${detail.moves.slice(0, 10).join(", ")}
Estadísticas: ${detail.stats.map((s) => `${s.name}:${s.value}`).join(", ")}
Contesta siempre como si fueras el Pokémon.`
    : `Eres ${pokemon.name}. Aún no tengo todos mis datos.`;   // fallback temporal

  /* ────── 3. Enviar mensaje ────── */
  /* …dentro del componente… */
const send = async () => {
  if (!msg.trim()) return;

  setThinking(true);                         // ← empieza a “pensar”
  const prompt = `${basePrompt}\n\nUsuario: ${msg}`;

  try {
    const reply = await askGemini(prompt);
    setHistory((h) => [...h, { q: msg, a: reply }]);
  } catch (err) {
    console.error(err);
    setHistory((h) => [...h, { q: msg, a: "😵‍💫 ¡Ups! Hubo un error." }]);
  } finally {
    setThinking(false);                      // ← deja de “pensar”
    setMsg("");
  }
};


  /* ────── 4. UI ────── */
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-4 rounded flex flex-col gap-4">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>

        {/* historial */}
        <div className="flex flex-col gap-2 h-64 overflow-y-auto border p-2">
  {history.map((e, i) => (
    <div key={i}>
      <p className="font-semibold">Tú: {e.q}</p>
      <p className="text-indigo-700">{pokemon.name}: {e.a}</p>
    </div>
  ))}
</div>

{thinking && <p className="text-sm italic text-gray-500">Pensando…</p>}   {/* ← NUEVO */}
        <div className="flex gap-2">
          <input
            className="border p-2 flex-grow rounded"
            placeholder="Pregúntame algo…"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white px-4 rounded"
            onClick={send}
            disabled={!detail}      /* evita enviar antes de tener el prompt completo */
          >
            ▶
          </button>
        </div>

        <button className="text-red-600 self-end" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
