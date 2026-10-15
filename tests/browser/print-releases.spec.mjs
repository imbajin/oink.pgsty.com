import { test, expect } from '@playwright/test';

for (const language of ['', '/zh']) {
  for (const width of [360, 1440]) {
    test(`release Print includes both complete chapters: ${language || 'en'} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const body = language ? '完整发布正文' : 'Full release body';
      const details = language ? '详情' : 'Details';
      const heading = language ? '发布详情' : 'Release details';
      await page.goto(`${language}/tests/print-releases/`);
      await expect(page.locator('.td-release-index__item')).toHaveCount(2);
      await expect(page.locator('main')).not.toContainText(`${body} one`);
      await page.goto(`${language}/_print/tests/print-releases/`);
      await expect(page.locator('.td-release-index')).toHaveCount(0);
      for (const chapter of ['one', 'two']) {
        await expect(page.locator('main')).toContainText(`${body} ${chapter} continuation.`);
        const link = page.getByRole('link', { name: `${details} ${chapter}`, exact: true });
        await expect(link).toHaveAttribute('href', /^#pg-[\da-f]+--release-details$/);
        await link.click();
        await expect(page.locator(':target')).toContainText(`${heading} ${chapter}`);
      }
      const duplicateIDs = await page.locator('[id]').evaluateAll(nodes => {
        const ids = nodes.map(node => node.id);
        return ids.filter((id, index) => ids.indexOf(id) !== index);
      });
      expect(duplicateIDs).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}
