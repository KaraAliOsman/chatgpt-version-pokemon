import { useEffect, useState } from "react";

export default function useLocalLikes() {
  const [likes, setLikes] = useState(() =>
    JSON.parse(localStorage.getItem("likes") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const toggle = (id) =>
    setLikes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return { likes, toggle };
}
