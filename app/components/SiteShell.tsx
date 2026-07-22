"use client";

import { useCallback, useState, type ReactNode } from "react";
import { EmberLayer } from "./EmberLayer";
import { FireBackground } from "./FireBackground";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ProductSwitcher } from "./ProductSwitcher";

export function SiteShell({ children }: { children: ReactNode }) {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const openSwitcher = useCallback(() => setSwitcherOpen(true), []);
  const closeSwitcher = useCallback(() => setSwitcherOpen(false), []);

  return (
    <>
      <FireBackground />
      <EmberLayer />
      <div className="grain" aria-hidden="true" />
      <Navbar
        onOpenSwitcher={openSwitcher}
        switcherOpen={switcherOpen}
      />
      <ProductSwitcher open={switcherOpen} onClose={closeSwitcher} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
