import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-ink-deep sm:mt-24">
      <div className="shell flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:py-10 sm:text-left">
        <Logo variant="footer" />
        <p className="text-xs text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
