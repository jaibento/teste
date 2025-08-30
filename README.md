# Implementação do MVP Web
Implementação de algumas páginas web utilizando HTLM, CSS e JAVASCRIPT da disciplina de Projeto Integrado do curso de Análise e Desenvolvimento de Sistemas da UFCA, seguindo as práticas aprendidas a respeito de layout, acessibilidade e responssividade

O projeto se baseia em um Sistema de RH de pequeno porte

O projeto usa o local Storage do javascript para simular o CRUD

# Versão Live utilizando GitHub Pages:
Você pode acessar o site pelo link:
[Sistema TopRh](https://pedro9185.github.io/Sprint-2-Projeto-Integrado-III/)<br>

# Telas Principais implementadas:
- Página inicial com apresentação do sistema
- Página de Login e Cadastro de usuários
- Página Home/dashboard do sistema
- Página Colaboradores com a relação dos funcionários cadastrados
- Página Novo Colaborador cadastra um novo funcionário
- Modal para visualizar as informações do colaborador 
- Página Gestão de Ponto com informações dos funcionários(funcionalidade do ponto não implementada)
- Página ver informações do ponto com dados státicos para simulação
- Página Folha de pagamento (funcionalidades não implementadas)
- Página Gestão de benefícios (funcionalidades não implementadas)
- Página Sobre com informações da equipe
# Funcionalidades Principais implementadas:

### Geral
- Uso de tags semânticas no HTML
- Breadcrumbs em todas as páginas para fácil navegação
- local Storage do javascript para cadastro, login e CRUD dos colaboradores
- Responsividade: Adaptações para diferentes tamanhos de telas utilizando media queries, tamanhos principais consideerados: 1024px, 768px, 425px, 320px
- Menu de navegação lateral responsível e retrátil para telas menores
- Menu de usuário retrátil com Logout(remove o usuário logado do localStorage)

### Página Inicial
- Página Inicial com apresentação do sistema e cards interativos

### Página Login/Cadastro
- Login e Cadastro do usuario salvando dados no localStorage 
- validação dos campos de login e feedback para o usuario caso ele não esteja cadastrado ou o email ou senha estiverem incorretos
- validação dos campos de cadastro e feedback para o usuario caso as senhas não sejam iguais ou se já houver um email já cadastrado

### Página Home
- validação na pag home para não deixar o usuario acessar a pagina home sem ter um usuario logado
- Saudação para  o usuário logado baseado na hora do dia

### Página Colaboradores
- Principal mostrando todos os cadastradodos em uma tabela-Carrega os dados do local storage
  - Botão Novo para cadastrar um novo colaborador
    - Seleção de imagem e preview em tempo real
    - Tabs para divisão das informações
    - Feedback visual da escolha de arquivos de forma customizada
    - Validação dos campos:
      - Campos Obrigatórios com as devidas validações de formato e preenchimento
      - Feedback visual por meio de mensagem na ultima tab e bordas vermelhas nos campos inválidos
  - Botões de ação para:
    - Ver: Abre um modal com todas as informações do formulário
    - Editar: Carrega a página com as informações baseadas no id para edição
    - Excluir: Remove a entrada baseado no id
### Página Gestão de Ponto
  - Pagina inicial mostrando os funcionarios cadastrados puxando os dados direto do local storage
  - layout responsivo para varios tamanhos mobile e desktop
  - pagina stática para ver as informações do funcionario
### Página Gestão de Benefícios
 - Página inicial mostrando os pedidos de benefícios pricipais alimentação,  refeição e vale transporte
 - 
  - 
### Página Folha de Pagamento
  - Pagina inicial mostrando os funcionarios cadastrados puxando os dados direto do local storage
  - layout responsivo para varios tamanhos mobile e desktop

# Integração Contínua    
### 🔄 O que é?

**Integração Contínua (CI - Continuous Integration)** é uma prática do desenvolvimento de software onde o código é testado e validado automaticamente sempre que uma nova alteração é feita (como um *push* ou *pull request* no GitHub).

Isso significa que, sempre que alguém faz uma mudança no projeto, o GitHub executa automaticamente uma série de testes e verificações para garantir que o código continua funcionando corretamente.

### 🧠 Por que isso é importante para quem está aprendendo?

- ✅ **Ajuda a detectar erros cedo:** erros de lógica, digitação ou estrutura são encontrados automaticamente.
- ✅ **Evita quebrar o projeto sem perceber:** com testes automatizados, você sabe na hora se algo parou de funcionar.
- ✅ **Desenvolve boas práticas desde o início:** quem aprende com CI entende a importância de código limpo e testável.
- ✅ **Facilita o trabalho em equipe:** mesmo em grupos pequenos, a integração contínua mantém o código estável e padronizado.

> Em resumo: usar CI é como ter um assistente que testa seu código toda vez que você salva no GitHub — e avisa se algo deu errado. Isso dá mais confiança para continuar aprendendo e melhorando o projeto.

---

## 🧪 Testes Automatizados com GitHub Actions



Este projeto utiliza **GitHub Actions** para rodar automaticamente verificações e testes a cada push ou pull request. Isso garante a integridade e consistência do sistema mesmo em desenvolvimento ativo.

Os testes automatizados implementados até o momento são simples e limitados, pois este projeto ainda está em desenvolvimento e foca apenas no front-end, utilizando dados simulados (mockados) via localStorage, sem conexão com banco de dados real ou backend.

O objetivo principal nesta etapa é estabelecer uma base sólida de automações e boas práticas de Integração Contínua (CI), preparando o projeto para evoluções futuras com mais funcionalidades, testes completos e integração com API.

Mesmo em um projeto de protótipo, essas validações já ajudam a reforçar o aprendizado de ferramentas como ESLint, HTMLHint, Playwright e GitHub Actions — e demonstram como a automação pode ser aplicada desde os primeiros passos no desenvolvimento web.
 

### 🔍 Testes implementados:

| Tipo de Teste             | Descrição                                                                                       | Justificativa                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| **ESLint**                | Verifica o código JavaScript quanto a boas práticas de sintaxe e estilo                       | Garante um código limpo, padronizado e livre de erros comuns                  |
| **HTMLHint**              | Valida os arquivos HTML com base em boas práticas e regras definidas                          | Evita problemas de acessibilidade, semântica e estrutura                      |
| **Check Branch Name**     | Verifica se os nomes das branches seguem o padrão definido (`feature/*`, `bugfix/*`, etc.)    | Mantém organização e previsibilidade no controle de versões                   |
| **Playwright - Login**    | Testa diferentes cenários de login: sucesso, senha incorreta, e-mail inexistente, campos vazios| Simula a experiência real de usuário e garante o comportamento correto        |
| **Playwright - Cadastro** | Testa o cadastro de usuários: sucesso e tentativa com e-mail já cadastrado                    | Garante que as regras de validação estão funcionando corretamente             |

---

## 🧪 Rodando os testes localmente

Para desenvolvedores que desejam executar os testes manualmente antes de subir alterações, siga os passos abaixo.

### ✅ Pré-requisitos

Você precisa ter o [Node.js (versão LTS)](https://nodejs.org/) instalado localmente.  
O Node traz junto o `npm`, que será usado para instalar as ferramentas.

---
### Clone o repositório:

```bash
git clone https://github.com/pedro9185/Sprint-2-Projeto-Integrado-III.git
cd Sprint-2-Projeto-Integrado-III
```

### 🔧 Instalação das dependências

No terminal, dentro da raiz do projeto:

```bash
npm install
```

Isso instalará as dependências do projeto, incluindo:
- `eslint`
- `htmlhint`
- `playwright`

---

### 📘 Executando os testes Playwright

Para rodar **todos os testes E2E** do Playwright:

```bash
npx playwright test
```

Para visualizar o teste rodando no navegador:

```bash
npx playwright test --headed
```

Você pode rodar testes específicos, por exemplo:

```bash
npx playwright test tests/login.spec.js
```

---

### 📗 Verificando erros com ESLint

Para verificar todos os arquivos `.js`:

```bash
npx eslint "**/*.js"
```

Esse comando analisa seu código JavaScript conforme as regras definidas no projeto.

---

### 📙 Verificando problemas com HTMLHint

Para validar todos os arquivos `.html`:

```bash
npx htmlhint "**/*.html"
```

Isso verifica semântica, acessibilidade e estrutura do HTML com base nas regras do arquivo `htmlhint.yml`.

---

### ✅ Dica final

Você não precisa instalar ESLint, Playwright ou HTMLHint globalmente — o `npx` executa usando as dependências locais listadas no `package.json`.

## Desenvolvedores
[Lucas Araujo](https://github.com/lal28)<br>
[Pedro Henrique](https://github.com/Pedro9185)<br>
[Maria Mikaelle Andrade](https://github.com/Mikaelle27)<br>
[Jaine Bento](https://github.com/jaibento)<br>



## Projeto
**Ferramentas Utilizadas:**
Para prototipação e ícones:
[Figma](https://www.figma.com/)<br>
Para desenvolvimento do código:
[Visual Studio Code](https://code.visualstudio.com/)
