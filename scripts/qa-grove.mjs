#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const errors = [];

async function shot(page, name) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/workspace/screenshots/${name}.png`, fullPage: false });
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle", timeout: 45000 });
  await shot(page, "cover");

  await page.goto("http://127.0.0.1:8080/login", { waitUntil: "networkidle" });
  await shot(page, "login");

  // wipe persisted farm so onboarding is predictable
  await page.goto("http://127.0.0.1:8080/studio", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("grove.farm.v1"));
  await page.reload({ waitUntil: "networkidle" });
  await shot(page, "onboarding");

  const plantBtn = page.getByRole("button", { name: /Plant an optimal mix/i });
  await plantBtn.waitFor({ timeout: 8000 });
  await plantBtn.click();
  await page.waitForTimeout(900);
  await shot(page, "studio");

  await page.goto("http://127.0.0.1:8080/library", { waitUntil: "networkidle" });
  await shot(page, "library");
  const first = page.locator("main button").first();
  if (await first.count()) await first.click();
  await shot(page, "library-open");

  await page.goto("http://127.0.0.1:8080/guilds", { waitUntil: "networkidle" });
  await shot(page, "guilds");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on("pageerror", (err) => errors.push("mobile: " + String(err)));
  await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await shot(mobile, "cover-mobile");
  await mobile.goto("http://127.0.0.1:8080/studio", { waitUntil: "networkidle" });
  await shot(mobile, "studio-mobile");
  const overflow = await mobile.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  console.log(JSON.stringify({ overflow, errors }, null, 2));
} finally {
  await browser.close();
}
