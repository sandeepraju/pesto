import type { ElementType, HTMLAttributes, ReactNode } from "react";

/*
 * Composable layout primitives.
 *
 * - Container caps width to a named track size and centres.
 * - Section is a vertical block with a named spacing scale.
 * - Stack is a flex container with a named gap, vertical by default.
 *
 * The named scales (sm / md / lg / xl) compose with the design tokens
 * in globals.css so a future change to spacing rhythm is a one-line
 * edit. Use these in preference to ad-hoc max-w / py / gap utility
 * combos.
 */

type ContainerSize = "prose" | "content" | "wide" | "full";

const containerSize: Record<ContainerSize, string> = {
  prose: "max-w-[65ch]",
  content: "max-w-3xl",
  wide: "max-w-(--breakpoint-lg)",
  full: "max-w-full",
};

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  size?: ContainerSize;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  size = "wide",
  className = "",
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={`${containerSize[size]} mx-auto ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

const sectionSpacing: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-4",
  md: "py-6 md:py-8",
  lg: "py-10 md:py-16",
  xl: "py-16 md:py-24",
};

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  spacing?: SectionSpacing;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "as">;

export function Section<T extends ElementType = "section">({
  as,
  spacing = "md",
  className = "",
  children,
  ...rest
}: SectionProps<T>) {
  const Tag = (as ?? "section") as ElementType;
  return (
    <Tag className={`${sectionSpacing[spacing]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between";

const stackGap: Record<StackGap, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-10",
};

const stackAlign: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const stackJustify: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  gap?: StackGap;
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "as">;

export function Stack<T extends ElementType = "div">({
  as,
  gap = "md",
  direction = "vertical",
  align,
  justify,
  wrap = false,
  className = "",
  children,
  ...rest
}: StackProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const dir = direction === "horizontal" ? "flex-row" : "flex-col";
  const classes = [
    "flex",
    dir,
    stackGap[gap],
    align ? stackAlign[align] : "",
    justify ? stackJustify[justify] : "",
    wrap ? "flex-wrap" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
