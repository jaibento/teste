import { test, expect } from '@playwright/test';

const BASE_URL = 'https://pedro9185.github.io/Sprint-2-Projeto-Integrado-III/login.html';

//Teste de login(redireciona para home)
test.describe('Testes da tela de login', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Login bem-sucedido redireciona para home.html', async ({ page }) => {
    await page.evaluate(() => {
      const usuarios = [
        {
          nome: 'Usuário Teste',
          email: 'teste@rh.com',
          senha: '123456'
        }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    });

    await page.reload();
    await page.fill('#email', 'teste@rh.com');
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');
    await page.waitForURL('**/home.html');
    await expect(page).toHaveTitle('Sistema RH TopRH');
  });

  //Teste de email não cadastrado
  test('Exibe erro ao usar e-mail não cadastrado', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('usuarios', JSON.stringify([]));
    });

    await page.reload();
    await page.fill('#email', 'naoexiste@email.com');
    await page.fill('#password', 'qualquercoisa');
    await page.click('input[type="submit"]');

    const feedback = page.locator('#feedBackEmail');
    await expect(feedback).toBeVisible();
  });
  //Teste de senha incorreta
  test('Exibe erro ao usar senha incorreta', async ({ page }) => {
    await page.evaluate(() => {
      const usuarios = [
        { nome: 'Usuário Teste', email: 'teste@email.com', senha: 'correta123' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    });

    await page.reload();
    await page.fill('#email', 'teste@email.com');
    await page.fill('#password', 'errada');
    await page.click('input[type="submit"]');

    const feedback = page.locator('#feedBackEmail');
    await expect(feedback).toBeVisible();
  });

});
