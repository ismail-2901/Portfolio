import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function SectionIntro({ eyebrow, title, description, action, className }: SectionIntroProps) {
  return (
    <div className={cn("grid gap-5 border-b border-rule pb-6 md:grid-cols-[1fr_auto] md:items-end", className)}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-tight text-copy md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="copy-measure mt-4 leading-7 text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="md:pb-1">{action}</div> : null}
    </div>
  );
}