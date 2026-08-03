import Link from "next/link";
import { Boxes, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "var(--primary)" }}>
            <Boxes className="w-5 h-5" style={{ color: "var(--primary-fg)" }} />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="font-semibold text-base tracking-tight"
              style={{ color: "var(--heading)" }}>ÉLOITE</span>
            <span className="text-[11px]" style={{ color: "var(--muted)" }}>
              Business Intelligence
            </span>
          </div>
        </div>

        {/* 404 */}
        <div className="mb-6">
          <p className="text-8xl font-bold tracking-tighter mb-4"
            style={{ color: "var(--surface-3)" }}>
            404
          </p>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Page not found
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl
              text-sm font-semibold transition-colors hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-fg)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
