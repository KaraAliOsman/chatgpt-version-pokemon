export default function SearchBar({ value, onChange }) {
  return (
    <input
className="border p-2 w-full md:flex-1 md:min-w-[280px] rounded"
      placeholder="Buscar Pokémon…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
