import { expect, test } from '@playwright/test';

const source = (prefix) =>
  Array.from({ length: 12 }, (_, index) =>
    `${prefix} ${String(index + 1).padStart(2, '0')}\n`,
  ).join('');

async function expectUniqueIDs(page) {
  expect(await page.locator('[id]').evaluateAll((nodes) => {
    const ids = nodes.map((node) => node.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  })).toEqual([]);
}

async function viewportSize(root) {
  return root.locator('[data-td-code-viewport]').evaluate((node) => ({
    height: node.clientHeight,
    contentHeight: node.scrollHeight,
    maxHeight: getComputedStyle(node).maxHeight,
    overflowY: getComputedStyle(node).overflowY,
  }));
}

for (const width of [360, 1440]) {
  test.describe(`${width}px Landing content`, () => {
    test.use({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const language of ['', '/zh']) {
      test(`${language || '/en'} independent Markdown copies and expands its own code`, async ({ page }) => {
        // Exercise the real click handler in every engine without depending on
        // browser-specific clipboard permissions or the operating system clipboard.
        await page.addInitScript(() => {
          Object.defineProperty(Navigator.prototype, 'clipboard', {
            configurable: true,
            get: () => ({
              writeText: async (value) => { window.__landingCopiedText = value; },
            }),
          });
        });
        await page.goto(`${language}/tests/landing-fixes/`);
        await page.evaluate(() => document.fonts.ready);
        await expectUniqueIDs(page);
        const first = page.locator('#first-markdown [data-td-code]');
        const second = page.locator('#second-markdown [data-td-code]');
        for (const root of [first, second]) {
          await expect(root).toHaveCount(1);
          await expect(root).toHaveClass(/td-is-collapsed/);
          expect(await root.evaluate((node) => !!node.closest('.td-content'))).toBe(true);
          await expect(root.locator('[data-td-code-copy]'))
            .toHaveAttribute('data-td-code-target', await root.getAttribute('id'));
          const size = await viewportSize(root);
          expect(size.maxHeight).not.toBe('none');
          expect(size.overflowY).toBe('hidden');
          expect(size.contentHeight - size.height).toBeGreaterThan(20);
        }
        expect(await first.getAttribute('id')).not.toBe(await second.getAttribute('id'));

        await second.locator('[data-td-code-copy]').click();
        await expect.poll(() => page.evaluate(() => window.__landingCopiedText)).toBe(source('second'));
        await first.locator('[data-td-code-copy]').click();
        await expect.poll(() => page.evaluate(() => window.__landingCopiedText)).toBe(source('first'));

        const collapsed = await viewportSize(second);
        const expand = second.locator('[data-td-code-expand]');
        await expect(expand).toHaveAttribute('aria-expanded', 'false');
        await expand.click();
        await expect(expand).toHaveAttribute('aria-expanded', 'true');
        await expect(second).toHaveClass(/is-expanded/);
        await expect(first).toHaveClass(/td-is-collapsed/);
        await expect(first.locator('[data-td-code-expand]')).toHaveAttribute('aria-expanded', 'false');
        await expect.poll(async () => (await viewportSize(second)).height)
          .toBeGreaterThan(collapsed.height + 20);
        await expect.poll(async () => {
          const size = await viewportSize(second);
          return size.contentHeight - size.height;
        }).toBeLessThanOrEqual(1);
        await expand.click();
        await expect(expand).toHaveAttribute('aria-expanded', 'false');
        await expect(second).toHaveClass(/td-is-collapsed/);
        await expect.poll(async () => (await viewportSize(second)).height)
          .toBeLessThanOrEqual(collapsed.height + 1);

        await page.goto(`${language}/_print/tests/landing-fixes/`);
        await expectUniqueIDs(page);
        await expect(page.locator('[data-td-code]')).toHaveCount(2);
        await expect(page.locator('[data-td-code-copy], [data-td-code-expand]')).toHaveCount(0);
      });

      test(`${language || '/en'} stock 404 has no unavailable reading drawer`, async ({ page }) => {
        // The owning shell checker also builds this case with a root Docs
        // cascade; here the real site's error page receives responsive review.
        await page.goto(`${language}/404.html`);
        await expect(page.locator('.td-404')).toBeVisible();
        await expect(page.locator('.td-site-header')).toBeVisible();
        await expect(page.locator('#td-shell-sidebar, [data-td-shell-drawer-open]')).toHaveCount(0);
      });
    }
  });
}
