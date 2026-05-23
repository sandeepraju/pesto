import placeholders from "../data/blur-placeholders.json";

const map = placeholders as Record<string, string>;

export function getBlurDataURL(src: string): string | undefined {
  return map[src];
}
