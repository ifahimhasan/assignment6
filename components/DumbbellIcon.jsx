
export default function DumbbellIcon({ className = "", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <rect x="6.5" y="10.9" width="11" height="2.2" rx="0.6" />
      <rect x="4.2" y="6.8" width="2.8" height="10.4" rx="0.9" />
      <rect x="1.4" y="8.9" width="2.4" height="6.2" rx="0.8" />
      <rect x="17" y="6.8" width="2.8" height="10.4" rx="0.9" />
      <rect x="20.2" y="8.9" width="2.4" height="6.2" rx="0.8" />
    </svg>
  );
}
