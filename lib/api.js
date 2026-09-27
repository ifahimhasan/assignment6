export const API_URL = "https://api.api-store.workers.dev/api/fitlog";

// Normalises whatever shape the API sends back into a plain array / object.
function unwrap(json) {
  if (json && typeof json === "object" && !Array.isArray(json) && "data" in json) {
    return json.data;
  }
  return json;
}

export async function fetchWorkouts(init) {
  const res = await fetch(API_URL, init);
  if (!res.ok) throw new Error(`Could not load workouts (status ${res.status})`);
  const data = unwrap(await res.json());
  return Array.isArray(data) ? data : [];
}

export async function fetchWorkout(id, init) {
  try {
    const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, init);
    if (res.ok) {
      const data = unwrap(await res.json());
      if (Array.isArray(data)) {
        return data.find((w) => String(w.id) === String(id)) ?? null;
      }
      if (data && data.id != null) return data;
    }
    if (res.status === 404) return null;
  } catch {
    // fall through to the full list below
  }

  // Fallback: look the workout up in the full list.
  const all = await fetchWorkouts(init);
  return all.find((w) => String(w.id) === String(id)) ?? null;
}

export const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

// Duration: shortest first. Calories and rating: highest first.
export function sortWorkouts(list, sortBy) {
  const copy = [...list];
  switch (sortBy) {
    case "calories":
      return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "duration":
    default:
      return copy.sort((a, b) => a.duration - b.duration);
  }
}
