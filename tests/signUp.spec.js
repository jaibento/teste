import { test, expect } from '@playwright/test';

const SIGNUP_URL = 'https://pedro9185.github.io/Sprint-2-Projeto-Integrado-III/signUp.html';

test.describe('Testes da tela de cadastro', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(SIGNUP_URL);
  });

  test('Permite cadastro com nome, e-mail e senha válidos', async ({ page }) => {
    // Garante localStorage limpo
    await page.evaluate(() => localStorage.clear());

    // Preenche os campos com dados válidos
    await page.fill('#nome', 'Novo Usuário');
    await page.fill('#email', 'novo@email.com');
    await page.fill('#password', '123456');
    await page.fill('#repassword', '123456');

    // Submete o formulário
    await page.click('input[type="submit"]');

    // Aguarda o redirecionamento para login.html
    await page.waitForURL('**/login.html');
    await expect(page).toHaveURL(/login\.html$/);
  });

});
