export default function TagPills({ tags = [], uppercase = true, className = "" }) {
  if (!tags.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Muscle groups">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-black ${
            uppercase ? "uppercase tracking-wide" : "text-xs font-semibold"
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
