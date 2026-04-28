import { useEffect, useRef, useState, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";

const LANGUAGES = ["English", "French", "Spanish", "German", "Arabic"] as const;

export function LanguageDropdown(): ReactElement {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof LANGUAGES)[number]>("English");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onWindowClick(event: MouseEvent): void {
      const target = event.target;
      if (!rootRef.current || !(target instanceof Node)) {
        return;
      }
      if (!rootRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1 font-sans font-normal text-top-text"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <span>{selected}</span>
        <span className="inline-flex size-6 items-center justify-center" aria-hidden>
          <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} strokeWidth={2} />
        </span>
      </button>

      {open ? (
        <ul
          className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-32 rounded-control border border-hairline border-border-inverse bg-top py-1 shadow-card"
          role="listbox"
          aria-label="Languages"
        >
          {LANGUAGES.map((language) => {
            const isActive = language === selected;
            return (
              <li key={language}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`block w-full px-3 py-2 text-left font-sans text-title-14 text-top-text ${
                    isActive ? "bg-top-text/20" : "hover:bg-top-text/10"
                  }`}
                  onClick={() => {
                    setSelected(language);
                    setOpen(false);
                  }}
                >
                  {language}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
