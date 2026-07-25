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

  // Click outside to close
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

  // Keyboard shortcuts
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

  // Compact version: icon → animated expanding search bar
  if (compact) {
    return (
      <div ref={containerRef} className="relative flex items-center">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="p-2.5 text-gray-900 hover:text-red-600 rounded-xl transition-all duration-200 hover:bg-gray-50 group"
            aria-label="Suchen"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-lg z-50 overflow-hidden transition-all duration-300 ease-out animate-expand-search"
            style={{ width: "320px" }}
          >
            {/* Search icon inside */}
            <div className="pl-4 pr-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Produkte suchen…"
              className="flex-1 bg-transparent py-2.5 px-2 text-sm text-gray-900 placeholder-gray-400 outline-none min-w-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={() => { setExpanded(false); setQuery(""); }}
              className="mr-1 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
        className="w-full border rounded-xl px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
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
