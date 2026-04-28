import type {
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Figma checkout: muted label, grey fill, no heavy border */
  appearance?: "default" | "checkout";
}

export function Field({
  label,
  error,
  id,
  className = "",
  appearance = "default",
  required,
  ...rest
}: FieldProps): ReactElement {
  const inputId = id ?? rest.name;
  const isCheckout = appearance === "checkout";
  const labelClasses = isCheckout
    ? "font-sans text-title-16 text-fg opacity-40"
    : "font-sans text-title-16 text-fg";
  const inputClasses = isCheckout
    ? "h-[50px] w-full max-w-billing rounded-control border-0 bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none focus-visible:ring-2 focus-visible:ring-fg"
    : "w-full rounded-control border border-hairline border-border-subtle bg-surface px-4 py-3 font-sans text-title-16 text-fg outline-none focus-visible:ring-2 focus-visible:ring-fg";

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label className={labelClasses} htmlFor={inputId}>
        {label}
        {required ? (
          <span className="text-sale" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        required={required}
        {...rest}
      />
      {error ? (
        <p className="font-sans text-title-12 text-sale" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextAreaField({
  label,
  error,
  id,
  className = "",
  ...rest
}: TextAreaFieldProps): ReactElement {
  const areaId = id ?? rest.name;
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label className="font-sans text-title-16 text-fg" htmlFor={areaId}>
        {label}
      </label>
      <textarea
        id={areaId}
        className="min-h-40 w-full rounded-control border border-hairline border-border-subtle bg-surface px-4 py-3 font-sans text-title-16 text-fg outline-none focus-visible:ring-2 focus-visible:ring-fg"
        {...rest}
      />
      {error ? (
        <p className="font-sans text-title-12 text-sale" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
