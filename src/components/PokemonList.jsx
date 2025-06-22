import { useEffect, useMemo, useState } from "react";
import { fetchAllPokemons } from "../api/pokeapi";
import SearchBar   from "./SearchBar";
import SortSelect  from "./SortSelect";
import PokemonCard from "./PokemonCard";
import useLocalLikes from "../hooks/useLocalLikes";

export default function PokemonList() {
  const [list,  setList]  = useState([]);
  const [q,     setQ]     = useState("");
  const [order, setOrder] = useState("asc");
  const { likes, toggle } = useLocalLikes();

  useEffect(() => { fetchAllPokemons().then(setList); }, []);

  const filtered = useMemo(() => {
    const res = list.filter((p) => p.name.includes(q.toLowerCase()));
    return res.sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [list, q, order]);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
<div className="flex flex-col md:flex-row gap-4 md:justify-center mx-auto max-w-3xl">        
  <SearchBar value={q}    onChange={setQ}    />
        <SortSelect value={order} onChange={setOrder} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <PokemonCard
            key={p.id}
            pkm={p}
            liked={likes.includes(p.id)}
            onLike={toggle}
          />
        ))}
      </div>
    </div>
  );
}
