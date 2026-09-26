"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTourDatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [form, setForm] = useState({
    date: "",
    time: "",
    venue: "",
    city: "",
    state: "",
    address: "",
    zip: "",
    url: "",
    socialLink: "",
    note: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.date || !form.time || !form.venue) {
      setError("Date, time, and venue are required.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/tour-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Something went wrong saving this. Try again.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: 6,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 26, marginBottom: 24 }}>Add a tour date</h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Date *</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Time *</label>
        <input
          type="text"
          placeholder="e.g. 7:00 PM"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Venue *</label>
        <input
          type="text"
          placeholder="e.g. Spinster Abbott's"
          value={form.venue}
          onChange={(e) => update("venue", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>City</label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>State</label>
        <input
          type="text"
          value={form.state}
          onChange={(e) => update("state", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Social link</label>
        <input
          type="text"
          placeholder="e.g. @spinsterabbotts"
          value={form.socialLink}
          onChange={(e) => update("socialLink", e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Note</label>
        <textarea
          placeholder="e.g. with @ramblerkane"
          value={form.note}
          onChange={(e) => update("note", e.target.value)}
          style={{ ...inputStyle, minHeight: 80 }}
        />

        <button
          type="button"
          onClick={() => setShowMore((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            padding: 0,
            marginBottom: 16,
            fontSize: 14,
            textDecoration: "underline",
          }}
        >
          {showMore ? "Hide" : "Show"} more details (address, URL, zip)
        </button>

        {showMore && (
          <>
            <label style={labelStyle}>Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle}>Zip</label>
            <input
              type="text"
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle}>URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              style={inputStyle}
            />
          </>
        )}

        {error && (
          <p style={{ color: "red", marginBottom: 16 }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              flex: 1,
              padding: 14,
              fontSize: 16,
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {saving ? "Saving..." : "Save tour date"}
          </button>
          <a
            href="/admin"
            style={{
              flex: 1,
              padding: 14,
              fontSize: 16,
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: 8,
              textDecoration: "none",
              color: "#111",
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
