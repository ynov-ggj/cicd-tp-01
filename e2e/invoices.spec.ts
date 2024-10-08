import { users } from "@/app/lib/placeholder-data";
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill(users[0].email);
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill(users[0].password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Invoices' }).click();
});

test.describe("Invoices Page", () => {
  test("should display invoices data correctly", async ({ page }) => {
    await expect(page.getByRole('cell', { name: 'Michael Novotny\'s profile' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'michael@novotny.com' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '$448.00' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Sep 10,' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Evil Rabbit\'s profile picture' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'evil@rabbit.com' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '$6.66' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Jun 27,' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Pending' }).nth(2)).toBeVisible();
  });

  test("should filter invoices based on search query", async ({ page }) => {
    await page.getByPlaceholder('Search invoices...').click();
    await page.getByPlaceholder('Search invoices...').fill('Evil');
    await expect(page.getByRole('cell', { name: 'evil@rabbit.com' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Jun 27,' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'evil@rabbit.com' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Dec 6,' })).toBeVisible();
  });
});