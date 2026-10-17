import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const regions = [
  ['#capability-code', 'h3 a'],
  ['#plain-lines', 'h2 a'],
  ['#highlighted-code', 'h2 a'],
];

for (const width of [360, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test.describe(`${width}px ${colorScheme}`, () => {
      test.use({ viewport: { width, height: 900 }, colorScheme, reducedMotion: 'reduce' });
      for (const language of ['', '/zh']) {
        test(`${language || '/en'} Landing code accepts Tab and arrow scrolling`, async ({ page }) => {
          await page.goto(`${language}/tests/landing-code-focus/`);
          await page.evaluate(() => document.fonts.ready);
          for (const [selector, beforeSelector] of regions) {
            const region = page.locator(selector);
            const pre = region.locator('pre');
            await expect(pre).toHaveAttribute('tabindex', '0');
            await expect.poll(() => pre.evaluate(node => node.scrollWidth - node.clientWidth)).toBeGreaterThan(0);
            await region.locator(beforeSelector).focus();
            await page.keyboard.press('Tab');
            await expect(pre).toBeFocused();
            await pre.evaluate(node => { node.scrollLeft = 0; });
            // Repeated native key events also cover WebKit's scroll scheduling.
            await expect(async () => {
              await page.keyboard.press('ArrowRight');
              expect(await pre.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
            }).toPass({ intervals: [100], timeout: 3000 });
          }
          const scan = await new AxeBuilder({ page })
            .include('.td-landing-codeplate')
            .withRules(['scrollable-region-focusable'])
            .analyze();
          expect(scan.violations).toEqual([]);
        });
      }
    });
  }
}

for (const language of ['', '/zh']) {
  test(`${language || '/en'} Print line renderers remain static`, async ({ page }) => {
    await page.goto(`${language}/_print/tests/landing-code-focus/`);
    for (const selector of ['#capability-code pre', '#plain-lines pre']) {
      const pre = page.locator(selector);
      await expect(pre).toHaveCount(1);
      await expect(pre).not.toHaveAttribute('tabindex');
    }
  });
}
