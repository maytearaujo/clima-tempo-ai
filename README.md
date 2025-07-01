# WeatherApp React

Aplicativo web para consultar o clima atual de qualquer cidade, utilizando as APIs públicas do Open-Meteo e OpenStreetMap.

## Funcionalidades

- **Busca de cidade:** Digite o nome de qualquer cidade para consultar o clima.
- **Exibição de clima atual:** Mostra temperatura em Celsius, velocidade do vento e um resumo textual das condições (ex: Nublado, Claro).
- **Histórico de buscas:** Visualize o clima de várias cidades pesquisadas recentemente.
- **Mensagens de erro:** Exibe mensagens amigáveis caso a cidade não seja encontrada ou haja falha na API.
- **Interface moderna:** Desenvolvido com React e TailwindCSS para uma experiência responsiva e agradável.

## Requisitos

- Node.js (versão 16 ou superior recomendada)
- npm (ou yarn/pnpm)
- Acesso à internet para consumir as APIs públicas

## Instalação

1. Clone o repositório e acesse a pasta do frontend:
   ```bash
   cd clima_app/frontend

Copy

Insert

Instale as dependências:
npm install

Copy

Insert

Como usar
Inicie o servidor de desenvolvimento:
npm run dev

Copy

Insert

Acesse o aplicativo em http://localhost:5173 (ou a porta indicada no terminal).
Digite o nome de uma cidade na barra de busca e clique em "Obter Clima". O clima atual será exibido, junto com o histórico das últimas cidades pesquisadas.
Testes
O projeto inclui testes automatizados para garantir o funcionamento das principais funcionalidades.

Para rodar os testes:

npm test

Copy

Insert

Outras funcionalidades planejadas
Exibir previsão para os próximos 15 dias (em desenvolvimento)
Cache local das últimas buscas
Suporte a temas claro/escuro
Segurança e ética
O aplicativo não armazena dados sensíveis dos usuários.
Utiliza apenas APIs públicas e gratuitas.
Não expõe chaves de API ou informações privadas.
Código gerado com auxílio de IA, revise antes de uso em produção.
Uso responsável das APIs, respeitando limites e termos de serviço.
Licença
MIT License

Desenvolvido por Maytê Araújo com uso de Inteligência Artificial
Powered by Open-Meteo & OpenStreetMap
