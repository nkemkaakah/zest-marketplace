import type { ReactElement, ReactNode } from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
}

export function SectionTitle({
  eyebrow,
  title,
  action,
}: SectionTitleProps): ReactElement {
  return (
    <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span
            className="inline-block h-10 w-5 rounded-sm bg-sale"
            aria-hidden
          />
          <span className="font-sans text-title-16 font-medium text-fg">{eyebrow}</span>
        </div>
        <h2 className="font-display text-heading-36 text-fg tablet:text-heading-40">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
