import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Logo />
        <p className="text-xs text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
