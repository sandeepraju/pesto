import config from "../../data/config.json";

/*
 * Static newsletter signup form.
 *
 * Renders a plain HTML form that posts directly to the provider — no
 * JS, no client-side state, works during the static export. Supports
 * any provider that accepts a simple form post (Buttondown, ConvertKit,
 * MailerLite, Beehiiv, Mailchimp, etc.).
 *
 * Provider is configured in src/data/config.json under `newsletter`.
 * Set `enabled: false` (or omit the block entirely) to hide the
 * component everywhere it appears.
 */

type NewsletterConfig = {
  enabled?: boolean;
  action?: string;
  provider?: string;
  blurb?: string;
};

const newsletter = (config as { newsletter?: NewsletterConfig }).newsletter;

export default function NewsletterSignup({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  if (!newsletter?.enabled || !newsletter.action) return null;

  const isCard = variant === "card";
  const wrapperClass = isCard
    ? "max-w-[50em] mx-auto p-6 md:p-8 bg-surface border border-border rounded-lg shadow-md text-center"
    : "max-w-[50em] mx-auto py-6 text-left";

  return (
    <aside className={wrapperClass} aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="text-xl md:text-2xl font-bold font-serif mb-2">
        Get new posts by email
      </h2>
      <p className="text-muted-strong mb-5 max-w-[40em] mx-auto">
        {newsletter.blurb ?? "Subscribe to get new posts in your inbox. No spam, unsubscribe whenever."}
      </p>
      <form
        action={newsletter.action}
        method="post"
        target="_blank"
        className={`flex flex-col sm:flex-row gap-2 ${isCard ? "max-w-[28em] mx-auto" : "max-w-[28em]"}`}
      >
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-md bg-foreground text-background font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        >
          Subscribe <span aria-hidden="true">→</span>
        </button>
      </form>
      {newsletter.provider && (
        <p className="text-xs text-muted mt-3">Delivered via {newsletter.provider}.</p>
      )}
    </aside>
  );
}
