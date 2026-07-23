"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/storefront/AuthContext";

export default function AccountPage() {
  const { user, loading, login, register, logout } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  // Logged in — show dashboard
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mein Konto</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="space-y-1">
              <Link
                href="/account"
                className="block px-4 py-3 bg-gray-900 text-white rounded-lg font-medium"
              >
                Übersicht
              </Link>
              <Link
                href="/account/orders"
                className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Meine Bestellungen
              </Link>
              <Link
                href="/account/addresses"
                className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Adressen
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Abmelden
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Willkommen zurück!</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {user.name || "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">E-Mail:</span>{" "}
                  {user.email}
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  href="/account/orders"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Bestellungen ansehen
                </Link>
                <Link
                  href="/account/addresses"
                  className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Adressen verwalten
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Logged out — show login/register
  return <AuthForms login={login} register={register} />;
}

function AuthForms({
  login,
  register,
}: {
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ error?: string }>;
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);
    if (result.error) setLoginError(result.error);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegLoading(true);
    const result = await register(regEmail, regPassword, regName);
    setRegLoading(false);
    if (result.error) setRegError(result.error);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mein Konto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Anmelden</h2>
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Passwort
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                loginLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {loginLoading ? "Wird angemeldet..." : "Anmelden"}
            </button>
          </form>
        </div>

        {/* Register */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Registrieren</h2>
          {regError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
              {regError}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Vor- und Nachname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Passwort
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                required
                minLength={8}
                placeholder="Mindestens 8 Zeichen"
              />
            </div>
            <button
              type="submit"
              disabled={regLoading}
              className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                regLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {regLoading ? "Wird erstellt..." : "Konto erstellen"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
