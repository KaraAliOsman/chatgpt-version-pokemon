export default function SortSelect({ value, onChange }) {
  return (
    <select
      className="border p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="asc">A → Z</option>
      <option value="desc">Z → A</option>
    </select>
  );
}
