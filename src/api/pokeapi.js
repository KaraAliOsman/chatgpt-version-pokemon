const BASE = "https://pokeapi.co/api/v2/pokemon";

/** Lista básica (id, nombre, sprite) ⇢ 1 sola fetch */
export async function fetchAllPokemons() {
  const res  = await fetch(`${BASE}?limit=1300`);
  const data = await res.json();

  return data.results.map((p) => {
    const id = p.url.split("/").filter(Boolean).pop();

    return {
      id:   Number(id),
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
}
