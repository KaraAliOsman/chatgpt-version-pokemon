import { useState } from "react";
import ChatModal from "./ChatModal";

export default function PokemonCard({ pkm, liked, onLike }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="shadow rounded p-4 flex flex-col items-center gap-2">
        <img src={pkm.image} alt={pkm.name} />
        <h3 className="capitalize font-bold">{pkm.name}</h3>

        <div className="flex gap-4">
          <button
  aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
  className={`text-2xl ${liked ? "text-red-500" : "text-gray-400"}`}
  onClick={() => onLike(pkm.id)}
>
  ♥
</button>


          <button
            className="bg-indigo-600 text-white px-3 py-1 rounded"
            onClick={() => setOpen(true)}
          >
            Hablemos
          </button>
        </div>
      </div>

      {open && <ChatModal pokemon={pkm} onClose={() => setOpen(false)} />}
    </>
  );
}
