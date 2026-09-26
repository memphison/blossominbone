"use client";

import { useEffect, useState } from "react";

type TourDate = {
  id: number;
  date: string;
  time: string;
  venue: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  url: string | null;
  socialLink: string | null;
  note: string | null;
};

export default function AdminPage() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    fetch("/api/tour-dates")
      .then((res) => res.json())
      .then((data) => {
        setTourDates(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this tour date?")) return;

    await fetch(`/api/tour-dates/${id}`, { method: "DELETE" });
    setTourDates((prev) => prev.filter((td) => td.id !== id));
  }

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = tourDates.filter((td) => new Date(td.date) >= today);
  const past = tourDates
    .filter((td) => new Date(td.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function renderCard(td: TourDate) {
    return (
      <div
        key={td.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 18 }}>{td.venue}</div>
        <div>
          {new Date(td.date).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}{" "}
          - {td.time}
        </div>
        {td.city && (
          <div style={{ color: "#666" }}>
            {td.city}
            {td.state ? `, ${td.state}` : ""}
          </div>
        )}
        {td.note && <div style={{ marginTop: 8 }}>{td.note}</div>}

        <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
          <a href={`/admin/${td.id}/edit`}>Edit</a>
          <button
            onClick={() => handleDelete(td.id)}
            style={{
              color: "#b00",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Tour Dates</h1>

      <a
        href="/admin/new"
        style={{
          display: "inline-block",
          padding: "12px 20px",
          background: "#111",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          marginBottom: 24,
        }}
      >
        + Add a tour date
      </a>

      {upcoming.length === 0 && <p>No upcoming tour dates.</p>}
      {upcoming.map(renderCard)}

      {past.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <button
            type="button"
            onClick={() => setShowArchive((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              color: "#555",
              cursor: "pointer",
              padding: 0,
              fontSize: 15,
              textDecoration: "underline",
              marginBottom: 16,
            }}
          >
            {showArchive ? "Hide" : "Show"} past shows ({past.length})
          </button>

          {showArchive && past.map(renderCard)}
        </div>
      )}
    </div>
  );
}
