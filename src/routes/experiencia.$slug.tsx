import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CloudSun,
  Clock,
  Compass,
  Footprints,
  MapPin,
  Route as RouteIcon,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { SiteHeader } from "@/components/pulso/site-header";
import { VerifiedBadge } from "@/components/pulso/verified-badge";
import { Button } from "@/components/ui/button";
import { getExperience, type Experience } from "@/lib/experiences";

const TABS = ["Resumen", "Itinerario", "Impacto", "Proveedores", "Estado"] as const;
type Tab = (typeof TABS)[number];

const AUDIT_ICONS = [Footprints, Wallet, Users, Compass];

export const Route = createFileRoute("/experiencia/$slug")({
  loader: ({ params }) => {
    const experience = getExperience(params.slug);
    if (!experience) throw notFound();
    return { experience };
  },
  head: ({ loaderData }) => {
    const exp = loaderData?.experience;
    const title = exp ? `${exp.title} · Pulso` : "Experiencia · Pulso";
    const description = exp
      ? `${exp.summary} Auditoría de impacto y proveedores verificados en ${exp.location}.`
      : "Detalle de experiencia sostenible verificada en Perú.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ExperienceDetail,
});

function ExperienceDetail() {
  const { experience } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("Resumen");
  const [photo, setPhoto] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        {/* Cabecera */}
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {experience.verified && <VerifiedBadge />}
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {experience.duration}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {experience.title}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{experience.summary}</p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-soft">
              <img
                src={experience.gallery[photo]}
                alt={`${experience.title} — foto ${photo + 1}`}
                width={1280}
                height={960}
                className="h-64 w-full object-cover sm:h-96"
              />
            </div>
            <div className="mt-3 flex gap-3">
              {experience.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={photo === i}
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    photo === i ? "border-leaf" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={g} alt="" width={1280} height={960} loading="lazy" className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Panel de reserva */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Precio desde</p>
              <p className="mt-1 text-3xl font-extrabold text-foreground">
                S/ {experience.priceFrom}
                <span className="text-sm font-medium text-muted-foreground"> / persona</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-leaf" /> Todos los actores verificados
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-leaf" /> Grupos pequeños
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-leaf" /> Cancelación flexible 72 h antes
                </li>
              </ul>
              <Button size="lg" className="mt-5 w-full rounded-xl">
                Reservar ahora
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                No se cobra nada hasta confirmar con la comunidad anfitriona.
              </p>
            </div>
          </aside>
        </div>

        {/* Audit bar */}
        <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Resumen de impacto auditado
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experience.auditKpis.map((k, i) => {
              const Icon = AUDIT_ICONS[i % AUDIT_ICONS.length] ?? Footprints;

              return (
                <div key={k.label}>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Icon className="h-4 w-4 text-leaf" />
                    {k.label}
                  </p>
                  <p className="mt-1.5 text-xl font-extrabold text-primary">{k.value}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-leaf" style={{ width: `${k.score}%` }} />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{k.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-current={tab === t}
              className={`whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t
                  ? "border-b-2 border-primary text-primary"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {tab === "Resumen" && <ResumenPanel exp={experience} />}
            {tab === "Itinerario" && <ItinerarioPanel exp={experience} />}
            {tab === "Impacto" && <ImpactoPanel exp={experience} />}
            {tab === "Proveedores" && <ProveedoresPanel exp={experience} />}
            {tab === "Estado" && <EstadoPanel exp={experience} />}
          </div>

          {/* Panel lateral de contexto */}
          <aside className="space-y-6">
            <MapaPanel exp={experience} />
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <ShieldCheck className="h-4 w-4 text-leaf" /> Proveedores del itinerario
              </h3>
              <ul className="mt-3 space-y-3">
                {experience.providers.map((p) => (
                  <li key={p.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.category} · {p.credential}
                      </p>
                    </div>
                    <BadgeCheck className={`mt-0.5 h-4 w-4 shrink-0 ${p.verified ? "text-leaf" : "text-clay"}`} />
                  </li>
                ))}
              </ul>
            </div>
            <EstadoPanel exp={experience} compact />
          </aside>
        </div>
      </main>
    </div>
  );
}

function ResumenPanel({ exp }: { exp: Experience }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-bold text-foreground">Qué vas a vivir</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {exp.cardKpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-primary">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItinerarioPanel({ exp }: { exp: Experience }) {
  return (
    <div className="space-y-8">
      {exp.itinerary.map((day) => (
        <div key={day.day}>
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-extrabold text-primary">{day.day}</h2>
            <p className="text-sm text-muted-foreground">{day.label}</p>
          </div>
          <ol className="mt-4 space-y-5 border-l-2 border-border pl-6">
            {day.stops.map((s) => (
              <li key={`${day.day}-${s.time}`} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-leaf" />
                <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-primary">{s.time}</span>
                    <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  {s.image && (
                    <img
                      src={s.image}
                      alt={s.title}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="mt-3 h-36 w-full rounded-xl object-cover sm:h-44"
                    />
                  )}
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-foreground">{s.actor}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                        s.verification === "En proceso"
                          ? "bg-clay/20 text-clay-foreground"
                          : "bg-leaf/25 text-leaf-foreground"
                      }`}
                    >
                      <BadgeCheck className="h-3 w-3" />
                      Capa 1 · {s.verification}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function ImpactoPanel({ exp }: { exp: Experience }) {
  return (
    <div className="space-y-4">
      {exp.auditKpis.map((k) => (
        <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-bold text-foreground">{k.label}</h3>
            <span className="text-lg font-extrabold text-primary">{k.value}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-leaf" style={{ width: `${k.score}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{k.detail}</p>
        </div>
      ))}
    </div>
  );
}

function ProveedoresPanel({ exp }: { exp: Experience }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {exp.providers.map((p) => (
        <div
          key={p.name}
          className="flex items-start justify-between gap-4 border-b border-border p-5 last:border-b-0"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.category}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{p.name}</p>
            <p className="text-sm text-muted-foreground">{p.credential}</p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              p.verified ? "bg-leaf/25 text-leaf-foreground" : "bg-clay/20 text-clay-foreground"
            }`}
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            {p.verified ? "Verificado" : "En trámite"}
          </span>
        </div>
      ))}
    </div>
  );
}

function EstadoPanel({ exp, compact = false }: { exp: Experience; compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <CloudSun className="h-4 w-4 text-leaf" /> Estado digital del viaje
      </h3>
      <ul className={`mt-3 space-y-3 ${compact ? "" : "sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0"}`}>
        {exp.status.map((s) => (
          <li key={s.label} className="rounded-xl bg-secondary/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className={`h-2 w-2 rounded-full ${s.tone === "ok" ? "bg-leaf" : "bg-clay"}`} />
              {s.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MapaPanel({ exp }: { exp: Experience }) {
  const [activePoi, setActivePoi] = useState(0);
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <RouteIcon className="h-4 w-4 text-leaf" /> Mapa de la experiencia
      </h3>
      <div className="relative mt-3 h-44 overflow-hidden rounded-xl bg-accent/60">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />
        <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M30 130 C 90 110, 80 50, 150 60 S 250 40, 275 30"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        </svg>
        {exp.poi.map((p, i) => {
          const pos = [
            { left: "10%", top: "78%" },
            { left: "38%", top: "40%" },
            { left: "64%", top: "30%" },
            { left: "88%", top: "16%" },
          ][i % 4];
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => setActivePoi(i)}
              style={pos}
              aria-label={p.name}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background transition-transform ${
                activePoi === i ? "scale-125 bg-primary" : "bg-leaf"
              } h-4 w-4`}
            />
          );
        })}
      </div>
      <div className="mt-3">
        <p className="text-sm font-bold text-foreground">{exp.poi[activePoi]?.name}</p>
        <p className="text-xs text-muted-foreground">{exp.poi[activePoi]?.note}</p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {exp.poi.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              onClick={() => setActivePoi(i)}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                activePoi === i ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 text-leaf" />
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
