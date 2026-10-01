# Sancticom

Desenvolvimento web com propósito: sites para pequenas empresas e empreendedores marcarem o seu lugar na web.

🌐 [sancticom.com.br](https://sancticom.com.br)

## Stack

- Next.js 14 (Pages Router) e React 18
- PostgreSQL 16 em Docker, com migrations em `node-pg-migrate`
- Jest para os testes de integração da API
- ESLint, Prettier, Husky e Commitlint (Conventional Commits)

## Rodando localmente

Requisitos: Node na versão do `.nvmrc` e Docker.

```bash
npm ci
npm run dev
```

O `dev` sobe o Postgres, roda as migrations e abre o site em `http://localhost:3000`.

## Scripts

| Comando                       | O que faz                                   |
| ----------------------------- | ------------------------------------------- |
| `npm test`                    | Sobe o banco e roda os testes de integração |
| `npm run lint:prettier:check` | Confere a formatação                        |
| `npm run lint:eslint:check`   | Roda o ESLint                               |
| `npm run commit`              | Abre o assistente de commit (Commitizen)    |

## Estrutura

- `pages/`: as páginas do site e a API em `pages/api/v1`
- `components/`: cabeçalho, rodapé, SEO e ícones
- `styles/globals.css`: a identidade visual, com o azul-marinho `#0d2c54` e o dourado `#daa520` da logo
- `public/`: logo, ícones, imagem de compartilhamento, `robots.txt` e `sitemap.xml`
- `infra/`: banco, migrations e Docker Compose
- `tests/`: testes de integração

## Licença

[MIT](LICENSE)
