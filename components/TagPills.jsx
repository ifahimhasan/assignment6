export default function TagPills({ tags = [], uppercase = true, className = "" }) {
  if (!tags.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Muscle groups">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full bg-accent font-bold text-black ${
            uppercase ? "px-2.5 py-[3px] text-[9px] uppercase tracking-wider" : "px-3 py-1 text-[11px]"
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
