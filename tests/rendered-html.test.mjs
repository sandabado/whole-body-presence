import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("ships the authored Presence experience instead of the starter preview", async () => {
  const [home, experience, layout, shell] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/HomeExperience.tsx"),
    source("app/layout.tsx"),
    source("app/components/SiteShell.tsx"),
  ]);

  assert.match(home, /<HomeExperience\s*\/>/);
  assert.match(experience, /<FireHero\s*\/>/);
  assert.match(experience, /Not extraction\. Transformation\./);
  assert.match(experience, /Desert Fire Retreat/);
  assert.match(layout, /Whole Body Presence/);
  assert.match(layout, /https:\/\/wholebody\.community/);
  assert.match(shell, /<main id="main-content"/);
  assert.doesNotMatch(home + experience + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});

test("renders an SSR-safe living fire hero with an accessible static fallback", async () => {
  const [hero, capability] = await Promise.all([
    source("app/components/FireHero/FireHero.tsx"),
    source("app/components/FireHero/hooks/useDeviceMemory.ts"),
  ]);

  assert.equal(
    [...hero.matchAll(/<h1\b/g)].length,
    1,
    "the hero should contain exactly one semantic h1",
  );
  assert.match(hero, /Where the fire meets the body\./);
  assert.match(hero, /Retreats in the desert/);
  assert.match(hero, /href=["']\/events["']/);
  assert.match(hero, /href=["']\/about["']/);
  assert.match(hero, /Find a gathering/);
  assert.match(hero, /Learn our way/);
  assert.match(hero, /aria-labelledby=/);
  assert.match(hero, /aria-describedby=/);

  assert.match(hero, /<(?:img|picture)\b/);
  assert.match(hero, /presence-hero-fire-v1\.jpg/);
  assert.match(hero, /\bimport\(\s*["']\.\/RibbonSystem["']\s*\)/);

  assert.match(hero, /useDeviceMemory\s*\(/);
  assert.match(hero, /\breducedMotion\b/);
  assert.match(hero, /\breducedData\b/);
  assert.match(hero, /\bwebgl\b/);
  assert.match(capability, /prefers-reduced-motion:\s*reduce/);

  await Promise.all(
    [
      "app/components/FireHero/RibbonSystem.tsx",
      "app/components/FireHero/shaders/ribbon.frag",
      "app/components/FireHero/controls/AmbienceToggle.tsx",
      "app/components/FireHero/controls/LoadingFallback.tsx",
      "app/components/FireHero/hooks/useDeviceMemory.ts",
      "app/components/FireHero/hooks/usePointerInfluence.ts",
      "app/components/FireHero/hooks/useScrollSpeed.ts",
      "public/presence-hero-fire-v1.jpg",
    ].map((path) => access(new URL(path, root))),
  );
});

test("keeps the complete content model and honest beta booking states", async () => {
  const [data, events, sessions, waitlist] = await Promise.all([
    source("app/components/data.ts"),
    source("app/events/[slug]/page.tsx"),
    source("app/sessions/[slug]/BookingWizard.tsx"),
    source("app/components/WaitlistForm.tsx"),
  ]);

  for (const slug of ["jesse-gawlik", "shannon-v", "marcus-reed", "sarah-veya", "hakon-wolf", "lena-kim"]) {
    assert.match(data, new RegExp(`slug: "${slug}"`));
  }
  for (const slug of ["desert-fire-retreat", "new-moon-circle", "somatic-intensive-weekend", "breathwork-facilitator-training", "full-moon-celebration", "virtual-integration-circle"]) {
    assert.match(data, new RegExp(`slug: "${slug}"`));
  }
  assert.match(events, /No payment is taken and no place is held today/);
  assert.match(sessions, /no payment is collected/i);
  assert.match(sessions, /These details have not been sent or stored/);
  assert.match(waitlist, /fetch\("\/api\/waitlist"/);
});

test("connects all six canonical domains through an accessible switcher", async () => {
  const [switcher, navbar] = await Promise.all([
    source("app/components/ProductSwitcher.tsx"),
    source("app/components/Navbar.tsx"),
  ]);

  for (const domain of [
    "wholebody.earth",
    "wholebody.foundation",
    "wholebody.studio",
    "wholebody.community",
    "wholebody.press",
    "wholebody.law",
  ]) {
    assert.match(switcher, new RegExp(domain.replace(".", "\\.")));
  }
  assert.match(switcher, /aria-modal="true"/);
  assert.match(switcher, /event\.key === "Escape"/);
  assert.match(navbar, /aria-label="Whole Body Presence home"/);
  assert.match(navbar, /aria-haspopup="dialog"/);
  assert.match(navbar, /Skip to content/);
});

test("keeps a single document main landmark", async () => {
  const paths = [
    "app/practitioners/page.tsx",
    "app/practitioners/[slug]/page.tsx",
    "app/events/page.tsx",
    "app/events/[slug]/page.tsx",
    "app/sessions/page.tsx",
    "app/sessions/[slug]/page.tsx",
  ];
  const routes = (await Promise.all(paths.map(source))).join("\n");
  assert.doesNotMatch(routes, /<\/?main\b/);
});
