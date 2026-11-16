# First Customer Finder — Brasil

Skill para Claude Code que encontra **possíveis primeiros clientes** de uma startup a partir de sinais públicos verificados, adaptada ao mercado brasileiro.

Fork de [carolinacherry/claude-first-customer-finder-skill](https://github.com/carolinacherry/claude-first-customer-finder-skill) (MIT), revisado linha a linha a partir do commit `d1b3873` antes das mudanças.

É **só pesquisa**: define o cliente ideal (ICP), procura sinais públicos de dor e de compra, verifica cada fonte, pontua os prospects, rascunha a primeira mensagem e gera um relatório HTML em português. **Nunca envia mensagem nem contata ninguém.**

## O que mudou em relação ao original

| Original | Este fork |
|---|---|
| Inglês | Tudo em português do Brasil: instruções, frases de busca, mensagens e relatório |
| Fontes genéricas (Reddit, G2...) | Fontes brasileiras: Reclame Aqui, LinkedIn/Instagram públicos, Gupy/Vagas.com/Catho, diários oficiais, licitações (PNCP), associações de classe |
| Regras de privacidade gerais | **LGPD explícita**: foco em pessoa jurídica; MEI e autônomo tratados como pessoa física; base CNPJ só para confirmar empresa, **nunca como lista de disparo**; mensagem com opção de "não quero contato" |
| "Verifique pelo navegador" quando o site bloqueia | **Proibido usar a sessão logada do usuário** para contornar bloqueio: só API/RSS pública, senão descarta |
| Grupos privados não citados explicitamente | Proibido entrar em WhatsApp, Telegram, Facebook ou Discord fechados |
| Instala pelo pacote do npm (código não auditável aqui) | Instala **só a partir deste repositório, fixado numa tag**; `package.json` marcado como `private` para não ir ao npm por engano |
| Nome `first-customer-finder` | Nome `first-customer-finder-br` (convive com o original sem conflito) |
| Instalador apagava a pasta de destino sem checar o nome | Instalador só apaga a pasta da própria skill |

## Instalar (escolha um)

**npx direto do GitHub, fixado na versão revisada** (recomendado):

```bash
npx --yes github:ArlanSousa90/first-customer-finder-br#v0.1.0-br.1
```

O `#v0.1.0-br.1` trava a versão: o npx baixa exatamente este repositório nesta tag, e não o pacote `claude-first-customer-finder-skill` do registro do npm (que pode ter código diferente do GitHub). **Não use** `npx claude-first-customer-finder-skill` nem `npx skills add carolinacherry/...`.

**Manual** (cópia local revisada):

```bash
git clone https://github.com/ArlanSousa90/first-customer-finder-br.git
cd first-customer-finder-br && git checkout v0.1.0-br.1
node scripts/install.js            # copia para ~/.claude/skills/first-customer-finder-br
```

O instalador respeita `CLAUDE_CONFIG_DIR` e aceita `--skills-dir PASTA`.

## Usar

Abra uma nova sessão do Claude Code e peça naturalmente:

```
Ache dez possíveis primeiros clientes para https://seusite.com.br
```

Modos: `rápido` (5 prospects), `padrão` (10), `profundo` (20 + mapa de dores), `parceiros-de-design`, `b2b`, `comunidade`. Basta dizer: *"roda no modo b2b"*.

**Custo:** uma execução padrão abre cinco pesquisas em paralelo e leva ~10–15 minutos. Se estiver com limite de uso apertado, peça *"modo rápido, em sequência"*.

## Regras de segurança e privacidade embutidas

- Só informação profissional/empresarial publicada de propósito.
- Nada de login, paywall, grupo privado, corretor de dados, lista comprada, raspagem de contatos ou sessão logada do usuário.
- Nada de e-mail/telefone pessoal, CPF, endereço residencial ou dado sensível.
- Todo prospect é rotulado "possível cliente com base em sinais públicos".
- A mensagem fica como rascunho; enviar nunca é trabalho da skill.

## Estrutura

```
.claude-plugin/plugin.json, marketplace.json   # manifestos (fork BR)
skills/first-customer-finder-br/
  SKILL.md                            # fluxo
  references/research-framework.md    # grupos de busca PT-BR, fontes BR, nota, regras de abordagem
  references/report-schema.md         # contrato do JSON do relatório
  scripts/generate_report.py          # gerador HTML (só biblioteca padrão, em português)
scripts/install.js                    # instalador
```

## Créditos e licença

Original: Daniel An ([carolinacherry/claude-first-customer-finder-skill](https://github.com/carolinacherry/claude-first-customer-finder-skill)), inspirado em [codex-first-customer-finder-skill](https://github.com/Kappaemme-git/codex-first-customer-finder-skill) de Francesco Mistero. Fork brasileiro: ArlanSousa90. Licença MIT (ver `LICENSE`).
