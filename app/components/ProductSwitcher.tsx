"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./ProductSwitcher.module.css";

type ProductSwitcherProps = {
  open: boolean;
  onClose: () => void;
};

type Product = {
  name: string;
  system: string;
  glyph: string;
  href: string;
  accent: string;
  state: "current" | "active" | "investor";
};

const products: Product[] = [
  {
    name: "Presence",
    system: "Fire",
    glyph: "🜂",
    href: "https://wholebody.community",
    accent: "#E8542A",
    state: "current",
  },
  {
    name: "Foundation",
    system: "Earth",
    glyph: "🜃",
    href: "https://wholebody.foundation",
    accent: "#22C55E",
    state: "active",
  },
  {
    name: "Press",
    system: "Air",
    glyph: "🜁",
    href: "https://wholebody.press",
    accent: "#C9A227",
    state: "active",
  },
  {
    name: "Studios",
    system: "Water",
    glyph: "🜄",
    href: "https://wholebody.studio",
    accent: "#2BA8A0",
    state: "active",
  },
  {
    name: "Guardian",
    system: "Aether",
    glyph: "☉",
    href: "https://wholebody.law",
    accent: "#7C3AED",
    state: "active",
  },
  {
    name: "Whole",
    system: "Seal",
    glyph: "◎",
    href: "https://wholebody.earth",
    accent: "#E8542A",
    state: "investor",
  },
];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function ProductSwitcher({ open, onClose }: ProductSwitcherProps) {
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 150;
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      closingRef.current = false;
      setClosing(false);
    }, delay);
  }, [onClose]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [open, requestClose]);

  if (!open) return null;

  return (
    <div
      className={`${styles.backdrop} ${closing ? styles.closing : ""}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        id="constellation-dialog"
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="constellation-title"
        aria-describedby="constellation-description"
      >
        <button
          ref={closeRef}
          className={styles.close}
          type="button"
          onClick={requestClose}
          aria-label="Close constellation"
        >
          <span aria-hidden="true">×</span>
          <span>Close</span>
        </button>

        <header className={styles.heading}>
          <p className={styles.kicker}>The Whole Body constellation</p>
          <h2 id="constellation-title">Choose your element.</h2>
          <p id="constellation-description">
            Six doors. One living system. Move between them without losing the
            thread.
          </p>
        </header>

        <div className={styles.grid}>
          {products.map((product, index) => {
            const tileStyle = {
              "--tile-accent": product.accent,
              "--tile-delay": `${90 + index * 50}ms`,
            } as CSSProperties;
            const tileContent = (
              <>
                <i className={`${styles.corner} ${styles.cornerNorthWest}`} />
                <i className={`${styles.corner} ${styles.cornerNorthEast}`} />
                <i className={`${styles.corner} ${styles.cornerSouthWest}`} />
                <i className={`${styles.corner} ${styles.cornerSouthEast}`} />
                <span className={styles.glyph} aria-hidden="true">
                  {product.glyph}
                </span>
                <strong>{product.name}</strong>
                <span className={styles.element}>{product.system}</span>
                <span className={styles.status}>
                  <i aria-hidden="true" />
                  {product.state === "current"
                    ? "★ Here"
                    : product.state === "investor"
                      ? "Investor"
                      : "Active"}
                </span>
              </>
            );

            if (product.state === "current") {
              return (
                <div
                  key={product.name}
                  className={`${styles.tile} ${styles.current}`}
                  style={tileStyle}
                  role="link"
                  aria-current="page"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  {tileContent}
                </div>
              );
            }

            return (
              <a
                key={product.name}
                className={styles.tile}
                style={tileStyle}
                href={product.href}
                target={product.state === "investor" ? "_blank" : undefined}
                rel={product.state === "investor" ? "noreferrer" : undefined}
                aria-label={`${product.name}, ${product.system}${
                  product.state === "investor" ? ", opens in a new tab" : ""
                }`}
              >
                {tileContent}
              </a>
            );
          })}
        </div>

        <p className={styles.mantra}>
          So It Is Built. So It Holds. So It Is. <span aria-hidden="true">🍀</span>
        </p>
      </div>
    </div>
  );
}
