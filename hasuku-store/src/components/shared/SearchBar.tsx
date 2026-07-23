"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  initialQuery = "",
  currentCategory,
  compact = false,
}: {
  initialQuery?: string;
  currentCategory?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus input when expanded
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  // Click/touch outside to close compact SearchBar
  useEffect(() => {
    if (!expanded || !compact) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [expanded, compact]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setExpanded(true);
      }
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const trimmed = query.trim();
    if (trimmed) {
      params.set("q", trimmed);
    }
    if (currentCategory) {
      params.set("category", currentCategory);
    }
    const qs = params.toString();
    router.push(qs ? `/catalog?${qs}` : "/catalog");
    if (compact) setExpanded(false);
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams();
    if (currentCategory) {
      params.set("category", currentCategory);
    }
    const qs = params.toString();
    router.push(qs ? `/catalog?${qs}` : "/catalog");
  };

  if (compact) {
    // Compact version: icon that expands into input
    return (
      <div ref={containerRef} className="relative">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Suchen (Strg+K)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border rounded-lg shadow-lg z-50"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchen… (Esc zum Schließen)"
              className="px-4 py-2 text-sm w-48 md:w-64 outline-none rounded-l-lg"
            />
            <button
              type="submit"
              className="px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => { setExpanded(false); setQuery(""); }}
              className="px-2 py-2 text-gray-400 hover:text-gray-600 border-l"
            >
              ✕
            </button>
          </form>
        )}
      </div>
    );
  }

  // Full-width version: used in catalog sidebar
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Produkte suchen…"
        className="w-full border rounded-lg px-4 py-2 pl-10 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </form>
  );
}
