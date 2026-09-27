
export const API_URL = "https://api.api-store.workers.dev/api/fitlog";

function unwrap(json) {
  if (json && typeof json === "object" && !Array.isArray(json) && "data" in json) return json.data;
  return json;
}


export async function fetchWorkouts() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load workouts (status ${res.status})`);
  const data = unwrap(await res.json());
  return Array.isArray(data) ? data : [];
}


export async function fetchWorkout(id) {
  try {
    const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (res.ok) {
      const data = unwrap(await res.json());
      if (Array.isArray(data)) return data.find((w) => String(w.id) === String(id)) ?? null;
      if (data && data.id != null) return data;
    }
  } catch {
  
  }
  const all = await fetchWorkouts();
  return all.find((w) => String(w.id) === String(id)) ?? null;
}

export const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];


export function sortWorkouts(list, sortBy) {
  const copy = [...list];
  if (sortBy === "calories") return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  if (sortBy === "rating") return copy.sort((a, b) => b.rating - a.rating);
  return copy.sort((a, b) => a.duration - b.duration);
}
