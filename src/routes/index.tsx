import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Leaf, Users, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/pulso/site-header";
import { VerifiedBadge } from "@/components/pulso/verified-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { experiences, destinations, quickFilters } from "@/lib/experiences";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulso · Turismo sostenible verificado en Perú" },
      {
        name: "description",
        content:
          "Marketplace de experiencias de turismo sostenible en Perú con huella, gasto en territorio y economía comunitaria auditados.",
      },
      { property: "og:title", content: "Pulso · Turismo sostenible verificado en Perú" },
      {
        property: "og:description",
        content:
          "Explora experiencias comunitarias en Cusco, Arequipa, Colca y Puno con métricas de impacto transparentes.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const toggle = (tag: string) =>
    setActive((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [query, active]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return experiences.filter((exp) => {
      const matchesQuery =
        !q ||
        exp.title.toLowerCase().includes(q) ||
        exp.location.toLowerCase().includes(q) ||
        exp.region.toLowerCase().includes(q);
      const matchesTags = active.every((tag) => exp.tags.includes(tag as never));
      return matchesQuery && matchesTags;
    });
  }, [query, active]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Buscador */}
        <section id="explorar" className="border-b border-border/70 bg-secondary/50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Impacto medido, no prometido
            </span>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
              Viaja por el Perú y mira exactamente a dónde va tu dinero
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
              Experiencias con actores verificados, huella calculada y economía comunitaria auditada.
            </p>

            <div className="mt-7 flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-soft sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary/70 px-4 py-3">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿A dónde te gustaría ir?"
                  aria-label="Buscar destino o experiencia"
                  className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="rounded-xl sm:px-8">
                Buscar
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Destinos populares
              </span>
              {destinations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setQuery(query === d ? "" : d)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    query === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filtros + grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((f) => {
              const on = active.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(f)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    on
                      ? "border-leaf bg-leaf text-leaf-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-leaf/60 hover:text-foreground"
                  }`}
                >
                  <Leaf className="h-3.5 w-3.5" />
                  {f}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))
              : results.map((exp) => (
                  <Link
                    key={exp.slug}
                    to="/experiencia/$slug"
                    params={{ slug: exp.slug }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative">
                      <img
                        src={exp.cover}
                        alt={exp.title}
                        width={1280}
                        height={960}
                        loading="lazy"
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {exp.verified && <VerifiedBadge className="absolute left-3 top-3" />}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location} · {exp.duration}
                      </p>
                      <h2 className="mt-2 text-lg font-bold leading-snug text-foreground">{exp.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{exp.summary}</p>

                      <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-secondary/70 p-3">
                        {exp.cardKpis.map((k) => (
                          <div key={k.label}>
                            <dt className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
                              {k.label}
                            </dt>
                            <dd className="mt-1 text-sm font-bold text-primary">{k.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                        <div>
                          <span className="block text-xs text-muted-foreground">Desde</span>
                          <span className="text-xl font-extrabold text-foreground">S/ {exp.priceFrom}</span>
                          <span className="text-xs text-muted-foreground"> / persona</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          Ver auditoría
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>

          {!loading && results.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No encontramos experiencias con esos filtros. Prueba quitando alguno.
            </p>
          )}
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="border-y border-border/70 bg-secondary/50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Cómo funciona</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Capa 1 · Formalidad",
                  text: "Verificamos autorizaciones de transporte, guías con carné y alojamientos registrados.",
                },
                {
                  icon: Leaf,
                  title: "Capa 2 · Impacto",
                  text: "Calculamos huella de movilidad, gasto que queda en el territorio y presión de visita.",
                },
                {
                  icon: Users,
                  title: "Capa 3 · Estado del viaje",
                  text: "Clima, vías y temporada actualizados antes y durante tu experiencia.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <c.icon className="h-6 w-6 text-leaf" />
                  <h3 className="mt-3 text-base font-bold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section id="impacto" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { v: "68%", l: "del gasto promedio queda en el territorio" },
              { v: "-42%", l: "de huella frente a un tour convencional" },
              { v: "34", l: "actores locales verificados en la red" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-primary p-7 text-primary-foreground shadow-lift">
                <p className="text-4xl font-extrabold">{s.v}</p>
                <p className="mt-2 text-sm opacity-90">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Pulso */}
        <section id="sobre-pulso" className="border-t border-border/70 bg-secondary/50">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Sobre Pulso</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Pulso conecta viajeros con operadores y comunidades del Perú que trabajan formalmente y comparten
              sus números. Cada experiencia publica su auditoría completa: quién presta el servicio, cuánto
              queda en la zona y qué huella deja el recorrido.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Pulso · Turismo sostenible en Perú</span>
          <span>Datos de impacto verificados por la red Pulso</span>
        </div>
      </footer>
    </div>
  );
}
