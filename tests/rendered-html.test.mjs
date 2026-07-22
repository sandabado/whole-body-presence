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
  assert.match(experience, /Where the fire meets the body\./);
  assert.match(experience, /presence-hero-fire-v1\.jpg/);
  assert.match(experience, /Not extraction\. Transformation\./);
  assert.match(experience, /Desert Fire Retreat/);
  assert.match(layout, /Whole Body Presence/);
  assert.match(layout, /https:\/\/wholebody\.community/);
  assert.match(shell, /<main id="main-content"/);
  assert.doesNotMatch(home + experience + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
  await access(new URL("public/presence-hero-fire-v1.jpg", root));
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
