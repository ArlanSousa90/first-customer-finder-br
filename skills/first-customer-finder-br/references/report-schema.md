# Esquema do relatório

O gerador transforma a análise em JSON num relatório HTML autônomo, em português. Escreva o JSON num diretório de trabalho/temporário e rode:

```bash
python3 scripts/generate_report.py analise.json outputs/primeiros-clientes.html
# Windows: py -3 scripts/generate_report.py analise.json outputs/primeiros-clientes.html
```

O script usa só a biblioteca padrão do Python 3.9+. Devolva o caminho absoluto do arquivo como link clicável. Não cole o JSON na resposta final, a menos que o usuário peça os dados brutos.

## Esquema

As **chaves** ficam em inglês (o gerador depende delas); os **valores** são escritos em português.

```json
{
  "title": "Primeiros clientes para Exemplo",
  "product": "Exemplo",
  "product_url": "https://example.com",
  "target_customer": "Escritórios de arquitetura que fazem aprovação de projeto em São Paulo",
  "search_scope": "Fontes públicas em português, últimos 12 meses",
  "generated_at": "2026-11-16",
  "mode": "padrão",
  "verdict": "Um parágrafo: esta startup tem sinais alcançáveis de primeiros clientes? De onde vêm os mais fortes?",
  "prospects": [
    {
      "name": "Escritório Exemplo Arquitetura",
      "type": "Empresa",
      "stage": "Ciente do problema",
      "score": 82,
      "signal": "O escritório escreveu publicamente que perde horas conferindo restrições do lote no GeoSampa antes de cada projeto.",
      "evidence": "Post público recente descrevendo o processo e o tempo gasto, em primeira pessoa.",
      "why_fit": "O produto entrega exatamente essa conferência de restrições pronta.",
      "why_now": "O post tem três semanas e pergunta como outros escritórios resolvem isso.",
      "source": {
        "title": "Como vocês conferem as restrições do lote?",
        "url": "https://example.com/post-publico",
        "type": "Post público (LinkedIn)",
        "date": "2026-10-26"
      },
      "channel": "Comentário no próprio post ou página de contato do escritório",
      "opener": "Vi seu post sobre conferir restrições do lote...",
      "caution": "Confirmar se o processo ainda é manual antes de oferecer.",
      "scores": {
        "pain": 5,
        "fit": 5,
        "timing": 4,
        "reachability": 4,
        "evidence": 4
      }
    }
  ],
  "patterns": [
    {
      "title": "Conferência manual de restrições",
      "count": 4,
      "insight": "Os escritórios conferem camada por camada no GeoSampa e esquecem itens."
    }
  ],
  "outreach_plan": {
    "angle": "Oferecer um teste manual (concierge) antes de pedir adoção de software.",
    "first_step": "Mandar aos três melhores prospects uma pergunta baseada na fonte.",
    "follow_up": "Mostrar uma demonstração de dois minutos só depois que confirmarem a dor.",
    "success": "Três conversas e um parceiro de design comprometido em sete dias."
  },
  "limits": [
    "Possíveis clientes inferidos de sinais públicos, não compradores confirmados.",
    "Conferir se cada sinal ainda vale antes de abordar; todo contato é manual."
  ]
}
```

## Regras

- Modo `padrão`: até 10 prospects. `rápido`: até 5. `profundo`: até 20.
- Todo prospect precisa de `source.url` real e verificada (http/https) e de `score` 0–100 coerente com `scores`.
- As chaves de `scores` são `pain`, `fit`, `timing`, `reachability`, `evidence`, cada uma de 0 a 5.
- Campos opcionais ausentes aparecem com padrão seguro; não invente texto para preencher.
- Datas no formato AAAA-MM-DD.
