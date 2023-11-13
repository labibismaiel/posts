const { test, expect } = require('@playwright/test');

test.describe('Post List Application Tests', () => {

  test('Load app and check initial state', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.post-card');
    const posts = await page.$$('.post-card');

    expect(posts.length).toBe(5); // Assuming 5 posts should be loaded initially
  });

  test('Interact with post arrows and check reordering', async ({ page }) => {
    await page.goto('/');
    await page.click('.post-card:nth-child(1) .arrow-down');
    const firstPost = await page.textContent('.post-card:nth-child(2)');
    expect(firstPost).toContain('Post 1');
  });

  test('Check history log updates', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.post-card')
    await page.click('.post-card:nth-child(1) .arrow-down');
    await page.waitForTimeout(1000);
    await page.waitForSelector('.history-item');
    const historyItems = await page.$$('.history-item');
    expect(historyItems.length).toBeGreaterThan(0);
  });

  test('Time travel functionality', async ({ page }) => {
    await page.goto('/');

    // Perform actions to generate history items
    await page.click('.post-card:nth-child(1) .arrow-down');
    await page.waitForSelector('.history-item');

    const initialFirstPost = await page.textContent('.post-card:nth-child(1)');
    await page.waitForSelector('.btn');
    await page.click('.btn'); // Click on a time travel button

    // Add assertion to check if the state of posts list reverts to the selected state
    const revertedFirstPost = await page.textContent('.post-card:nth-child(1)');
    expect(revertedFirstPost).not.toBe(initialFirstPost);
  });

});
