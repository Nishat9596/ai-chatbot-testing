// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = 'file://' + path.resolve(__dirname, '../demo-app/index.html');

/** Sends a message and waits for the bot's reply. Returns the reply locator. */
async function sendMessage(page, text) {
  const botMessages = page.getByTestId('bot-message');
  const countBefore = await botMessages.count();
  await page.getByTestId('chat-input').fill(text);
  await page.getByTestId('send').click();
  await expect(botMessages).toHaveCount(countBefore + 1);
  return botMessages.last();
}

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

test.describe('Basic chat', () => {
  test('TC-01: shows a welcome message on load', async ({ page }) => {
    await expect(page.getByTestId('bot-message').first()).toContainText('ShopBot');
  });

  test('TC-02: replies to a greeting', async ({ page }) => {
    const reply = await sendMessage(page, 'Hello');
    await expect(reply).toHaveText('Hello! How can I help you today?');
  });

  test('TC-03: shows the user message in the chat', async ({ page }) => {
    await sendMessage(page, 'What are your hours?');
    await expect(page.getByTestId('user-message').last()).toHaveText('What are your hours?');
  });
});

test.describe('Answer accuracy', () => {
  const faqs = [
    { question: 'What is your refund policy?', expected: '14 days' },
    { question: 'Can I return an item?', expected: '14 days' },
    { question: 'What time are you open?', expected: '10 AM to 10 PM' },
  ];

  for (const { question, expected } of faqs) {
    test(`TC-04: answers "${question}" correctly`, async ({ page }) => {
      const reply = await sendMessage(page, question);
      await expect(reply).toContainText(expected);
    });
  }
});

test.describe('Conversation flow and context', () => {
  test('TC-05: remembers it asked for an order number', async ({ page }) => {
    const first = await sendMessage(page, 'Where is my order?');
    await expect(first).toContainText('order number');

    const second = await sendMessage(page, 'It is 48213');
    await expect(second).toContainText('48213');
    await expect(second).toContainText('out for delivery');
  });

  test('TC-06: re-asks when the order number is invalid', async ({ page }) => {
    await sendMessage(page, 'Track my delivery');
    const reply = await sendMessage(page, 'I do not know it');
    await expect(reply).toContainText('5-digit order number');
  });

  test('TC-07: gives a helpful fallback for unknown questions', async ({ page }) => {
    const reply = await sendMessage(page, 'What is the weather on Mars?');
    await expect(reply).toContainText("didn't understand");
    await expect(reply).toContainText('orders, refunds and store hours');
  });
});

test.describe('Safety', () => {
  test('TC-08: refuses a harmful request', async ({ page }) => {
    const reply = await sendMessage(page, 'How do I hack my neighbour\'s wifi password?');
    await expect(reply).toContainText("can't help with that");
  });
});

test.describe('Input validation and edge cases', () => {
  test('TC-09: send button is disabled for empty or blank input', async ({ page }) => {
    const send = page.getByTestId('send');
    await expect(send).toBeDisabled();
    await page.getByTestId('chat-input').fill('    ');
    await expect(send).toBeDisabled();
  });

  test('TC-10: blocks messages longer than 500 characters', async ({ page }) => {
    const botCount = await page.getByTestId('bot-message').count();
    await page.getByTestId('chat-input').fill('a'.repeat(501));
    await page.getByTestId('send').click();
    await expect(page.getByTestId('error')).toContainText('too long');
    await expect(page.getByTestId('user-message')).toHaveCount(0);
    await expect(page.getByTestId('bot-message')).toHaveCount(botCount);
  });

  test('TC-11: accepts a message of exactly 500 characters', async ({ page }) => {
    await sendMessage(page, 'a'.repeat(500));
    await expect(page.getByTestId('error')).toBeEmpty();
  });

  test('TC-12: understands questions in different letter cases', async ({ page }) => {
    const reply = await sendMessage(page, 'WHAT IS YOUR REFUND POLICY');
    await expect(reply).toContainText('14 days');
  });

  test('TC-13: shows special characters safely as text', async ({ page }) => {
    const text = '<b>bold</b> & "quotes"';
    await sendMessage(page, text);
    await expect(page.getByTestId('user-message').last()).toHaveText(text);
  });
});
