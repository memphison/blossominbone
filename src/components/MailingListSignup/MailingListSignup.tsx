"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import styles from "./MailingListSignup.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function MailingListSignup({ className }: { className?: string }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const hasEndpoint = site.mailingListAction.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;

    if (!hasEndpoint) {
      const subject = encodeURIComponent("Mailing list signup");
      const body = encodeURIComponent(`Please add me to the mailing list: ${email}`);
      window.location.href = `mailto:${site.bookingEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(site.mailingListAction, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={className ? `${styles.signup} ${className}` : styles.signup}>
      <p className={styles.heading}>{site.mailingList.heading}</p>
      <p className={styles.body}>{site.mailingList.body}</p>

      {status === "success" ? (
        <p className={styles.statusMessage}>
          {hasEndpoint ? "You're on the list." : "Check your email — send it and you're on the list."}
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={inputId} className={styles.srOnly}>
            Email address
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button} disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : site.mailingList.buttonLabel}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className={styles.errorMessage}>
          Something went wrong — try again, or email {site.bookingEmail}.
        </p>
      )}
    </div>
  );
}
