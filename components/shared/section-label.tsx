import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono-ui inline-flex items-center gap-2.5 text-ink-dim",
        "before:inline-block before:h-px before:w-7 before:bg-accent before:content-['']",
        className
      )}
    >
      {children}
    </div>
  );
}
