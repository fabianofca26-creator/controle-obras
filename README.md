# Controle de Obra

App para acompanhar contratos, medições, lançamentos e a produção da obra.
Arquivo único, funciona offline, instala no celular e no PC. Os dados ficam no
navegador e, se você conectar, no seu Google Drive (arquivo `controle-obra.json`
dentro de uma pasta "Controle de Obra").

Endereço: https://fabianofca26-creator.github.io/controle-obras/

> Os dados do negócio **não** ficam neste repositório. O app publicado começa
> vazio; você importa seus dados uma vez (Mais → Importar backup) ou conecta o
> Google Drive. O arquivo `dados-migrados.json` fica só no seu computador.

## Conectar ao Google Drive (uma vez só)

Precisa de um "Client ID" — é uma chave que diz ao Google qual app está pedindo
acesso ao Drive. É grátis e leva uns 10 minutos.

1. Entre em https://console.cloud.google.com com a sua conta Google.
2. No topo, clique no seletor de projeto → **Novo projeto** → nome
   `Controle de Obra` → **Criar**. Espere e selecione o projeto.
3. Menu ☰ → **APIs e serviços** → **Biblioteca** → procure
   **Google Drive API** → **Ativar**.
4. Menu ☰ → **APIs e serviços** → **Tela de permissão OAuth** (pode aparecer
   como "Google Auth Platform"):
   - Tipo de usuário: **Externo** → Criar.
   - Nome do app: `Controle de Obra`; e-mail de suporte: o seu. Salvar.
   - Em **Público-alvo** (ou "Usuários de teste"): **Adicionar usuários** →
     o seu e-mail. Salvar. O app fica em modo "teste", que é o suficiente
     para uso próprio — não precisa publicar nem verificar.
5. Menu ☰ → **APIs e serviços** → **Credenciais** → **Criar credenciais** →
   **ID do cliente OAuth**:
   - Tipo: **Aplicativo da Web**.
   - Nome: `controle-obra`.
   - **Origens JavaScript autorizadas** → Adicionar URI:
     `https://fabianofca26-creator.github.io`
   - Criar. Copie o **ID do cliente** (termina em `.apps.googleusercontent.com`).
6. No app: **Mais → Nuvem (Google Drive)** → cole o Client ID →
   **Conectar e sincronizar**. Autorize na janela do Google.

A conexão vale por uma hora de uso; quando expirar, é só tocar em
**Sincronizar agora** de novo.

## Como funciona a sincronização

- Ao abrir o app e 3 segundos depois de cada alteração, ele compara com o
  Drive: a versão mais recente ganha.
- É feito pra uma pessoa só, um aparelho por vez. Se editar no celular e no PC
  sem sincronizar entre um e outro, a alteração mais antiga se perde.
- O backup manual (Mais → Exportar backup) continua existindo como plano B.

## Testar

Abrir `index.html?teste=1` roda os testes das regras (valor unitário, saldos,
medições, evolução).
