---
name: first-customer-finder-br
description: >-
  Encontra e qualifica, com evidência pública verificada, os primeiros clientes,
  early adopters, parceiros de design ou usuários beta de uma startup — com foco
  no mercado BRASILEIRO (fontes, vocabulário, LGPD e canais daqui). Use quando o
  pedido for "ache meus primeiros clientes", "quem compraria isso", "encontre
  early adopters", "ache parceiros de design / beta testers", "leads para minha
  startup", ou quando receber a URL/descrição de um produto e a pergunta for quem
  usaria ou pagaria. Só pesquisa: define o ICP, garimpa sinais públicos de dor e
  de compra, pontua prospects, rascunha a primeira mensagem e gera um relatório
  HTML em português. Nunca envia mensagem nem contata ninguém.
---

# First Customer Finder — Brasil

Transforma a URL ou a descrição de um produto numa lista curta de **possíveis** primeiros clientes, cada um ligado a um sinal público real que você abriu e verificou na fonte original. A lista é uma hipótese de pesquisa, não uma base de clientes.

Fork brasileiro de [carolinacherry/claude-first-customer-finder-skill](https://github.com/carolinacherry/claude-first-customer-finder-skill) (MIT). Escreva **tudo em português do Brasil**: análise, relatório e rascunhos de mensagem.

Leia [references/research-framework.md](references/research-framework.md) antes de buscar ou pontuar. Leia [references/report-schema.md](references/report-schema.md) antes de gerar o relatório.

## Fluxo

### 1. Entender o produto

Abra a URL fornecida (e as páginas de preço/sobre, se existirem) ou leia a descrição. Defina: o que o produto faz, o resultado que vende, quem usa e quem paga, preço ou forma de compra, cidade/estado/região atendida e o caso de uso mais forte.

Escolha **um ICP principal e um ICP vizinho**, cada um com gatilhos de dor, sinais positivos e critérios explícitos de exclusão. Em produto de dois lados, o principal é o lado que compra. Marque o que foi inferido e não observado. Faça no máximo **uma** pergunta ao usuário, e só se a dúvida mudar onde buscar (ex.: "atende só São Paulo capital ou o Brasil todo?").

### 2. Abrir a busca de sinais

Rode os cinco grupos de busca do framework (demanda explícita, dor, gambiarra, troca de ferramenta, momento) como **subagentes em paralelo** — um grupo por agente, cada um devolvendo sinais com URL, data e resumo fiel. Passe a cada agente o resumo do produto e o ICP, para ele descartar casos fracos na origem. Cada agente deve abrir e citar a fonte — **não pode devolver URL que não abriu**. Se o ambiente não tiver subagentes, rode os grupos em sequência.

Use o vocabulário do público brasileiro (veja o framework) e varie os tipos de fonte: fóruns e comunidades abertas, posts públicos em redes, avaliações (Reclame Aqui, Google, lojas de apps), issues do GitHub, páginas de empresas, vagas de emprego (LinkedIn Vagas, Gupy, Vagas.com, Catho, Indeed), diários oficiais e licitações públicas, notícias do setor.

### 3. Verificar antes de qualificar

Abra a página original de cada sinal antes de ele entrar na lista. Trecho de buscador, resumo de agregador ou paráfrase sem citação **não é evidência**. Confirme que a página existe, que o sinal diz o que foi afirmado, e a data. Descarte o que falhar. Registre URL, tipo de fonte, data visível (ou "data indisponível") e o que foi observado versus inferido. Se os subagentes já abriram e citaram, confira por amostragem — e sempre reverifique você mesmo os três primeiros.

Se um site bloquear a leitura automática, **não use a sessão logada do usuário nem o navegador dele para contornar**. Use só uma rota oficial e pública (API pública, RSS, versão pública da página). Sem rota legítima, descarte o sinal e registre "fonte bloqueada" na seção de limites.

Limites de pesquisa (inegociáveis):

- Só informação **profissional ou empresarial** compartilhada publicamente de propósito.
- Nunca contornar login, paywall, limite de requisições ou bloqueio de robôs; nunca entrar em grupo privado (WhatsApp, Telegram, Facebook fechado, Discord privado).
- Nada de corretores de dados, bases vazadas, listas compradas, nem descoberta de e-mail ou telefone pessoal.
- **LGPD:** o alvo é a empresa (pessoa jurídica). Não monte perfil de pessoa física; nunca colete CPF, endereço residencial, dados de família. Trate **MEI e profissional autônomo como pessoa física**: cite só o que ele próprio publicou como profissional, sem compilar dados pessoais. A base CNPJ da Receita pode confirmar que uma empresa existe e o que faz — **não é lista de disparo**.
- Nunca inferir ou usar dados sensíveis (saúde, finanças pessoais, política, religião, orientação sexual, origem racial).
- Parafrasear por padrão; citar o mínimo; linkar todo sinal relevante.

### 4. Pontuar e enxugar

Pontue cada prospect verificado com a rubrica ponderada do framework (dor, encaixe, momento, alcance, qualidade da evidência → 0–100). Remova duplicados. Prospect abaixo de 50, ou sem sinal citado de dor/demanda/momento, não entra na lista principal — encaixe no ICP sem sinal é especulação.

Nunca afirme nem sugira que o prospect está interessado, consentiu ou vai comprar. Rotule tudo como "possível cliente com base em sinais públicos".

### 5. Rascunhar a abordagem — nunca enviar

Para cada prospect, sugira o canal mais natural já ligado à fonte (resposta no próprio fórum/post, página de contato da empresa, perfil profissional público, WhatsApp **comercial** divulgado pela própria empresa) e escreva **uma** mensagem de até 90 palavras, em português, tom direto e educado: cite o contexto público de forma natural, ligue ao problema exato, descreva o produto em uma frase e termine com **uma** pergunta fácil de responder. Inclua uma forma simples de a pessoa dizer que não quer mais contato. Nada de intimidade fingida, nada de dado pessoal.

Não envie mensagens, não preencha formulários, não comente, não siga, não conecte, não crie registros em CRM. Se o usuário pedir para enviar, trate como pedido separado, com autorização explícita a cada mensagem.

### 6. Gerar o relatório

Padrão: relatório HTML autônomo, em português (só no chat, se o usuário pedir):

1. Escreva a análise em JSON conforme [references/report-schema.md](references/report-schema.md) num diretório de trabalho/temporário.
2. Rode `python3 scripts/generate_report.py <analise.json> <saida.html>` (o script fica na pasta desta skill; só biblioteca padrão; no Windows use `py -3`).
3. Salve o relatório em `outputs/` no workspace e devolva o caminho absoluto clicável.
4. Abra o HTML e confira: os cards aparecem, todo link de fonte é uma URL real, as notas batem com a rubrica, padrões e plano de sete dias estão presentes.

No chat, comece pelo veredito e pelo prospect mais forte, depois o link do arquivo.

## Modos

- **rápido** — até 5 prospects fortes.
- **padrão** (default) — até 10 prospects de vários tipos de fonte.
- **profundo** — até 20 prospects + mapa de dores repetidas.
- **parceiros-de-design** — prioriza quem vai testar e dar feedback, não quem compra.
- **b2b** — prioriza empresas, gatilhos públicos de negócio e cargos de decisão.
- **comunidade** — prioriza discussões públicas e pedidos explícitos de "alguém indica uma ferramenta".

## Pegadinhas

- **Inventar é o erro que mata esta skill.** Prospect plausível com link morto ou que não bate é pior que nenhum. A verificação (passo 3) é obrigatória, até no modo rápido.
- **Produto de dois lados:** os subagentes vão trazer os dois lados misturados. Filtre pelo ICP principal antes de pontuar; o outro lado entra em "padrões".
- **Sinal antigo:** um pedido explícito de 18 meses atrás pode valer, mas reduza a nota de momento e mostre a data.
- **Dez fortes valem mais que trinta genéricos.** Se a verificação deixar quatro ótimos, entregue quatro e explique.
- **Respeite a pressa.** Se o usuário pedir para acelerar ou encerrar, mude para o modo rápido na hora: pare de esperar grupos inacabados, verifique e pontue o que já tem e entregue o relatório dizendo quais grupos foram cortados.
- **Custo:** cinco subagentes em paralelo gastam bastante cota. Se o usuário disser que está com limite apertado, rode em sequência e no modo rápido.
