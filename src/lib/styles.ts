/**
 * Shared className constants.
 *
 * Most card-like surfaces on the site share the same visual language:
 * surface background, hairline border, rounded corners, shadow, and a
 * 1px lift on hover. Pulling that into a single string makes it cheap
 * to change the language (e.g. radius, shadow scale) in one place.
 */

export const cardSurface =
  "block bg-surface border border-border rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1";

export const cardSurfaceMuted =
  "block bg-surface-muted border border-border rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1";

export const linkUnderline =
  "underline underline-offset-4 decoration-dashed hover:decoration-solid";

export const tagPill =
  "px-2 py-0.5 text-xs rounded-full bg-accent-soft text-accent-strong";
