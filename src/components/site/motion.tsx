import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("motion-reveal", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("motion-stagger", className)}>{children}</div>;
}

export function StaggerItem({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("motion-stagger-item", className)}>{children}</div>;
}
