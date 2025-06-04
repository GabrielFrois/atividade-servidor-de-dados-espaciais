# Atividade 6 - Servidor de Dados Espaciais

## Visão Geral
Este projeto implementa um servidor Node.js utilizando o framework Express para fornecer dados espaciais relacionados à irradiação solar no Brasil. Os dados são provenientes do Atlas Brasileiro de Energia Solar de 2017, desenvolvido pelo LABREN/INPE. O servidor expõe rotas que permitem acessar informações sobre cidades e dados de irradiação solar.

## Estrutura do Repositório
O repositório possui a seguinte estrutura de diretórios e arquivos:
```
server/
├── data/
│   ├── cidade.geojson
│   ├── global_horizontal_means.geojson
│   └── comandos.sql
├── src/
│   ├── controllers/
│   │   ├── db.ts
│   │   └── load.ts
│   ├── routes/
│   │   └── cidade.ts
│   └── index.ts
├── README.md
├── .env              
├── package.json
├── package-lock.json
└── tsconfig.json
```
- `data/`: Contém os arquivos de dados espaciais fornecidos pelo LABREN/INPE.
- `src/`: Contém o código-fonte do servidor.
  - `controllers/`: Lida com a lógica de acesso e carregamento dos dados.
  - `routes/`: Define as rotas da API.
  - `index.ts`: Ponto de entrada da aplicação.
- `README.md`: Documentação do projeto.
- `.env`: Arquivo de variáveis de ambiente.
- `package.json`: Gerencia as dependências e scripts do projeto.
- `package-lock.json`: Registro detalhado das versões instaladas das dependências.
- `tsconfig.json`: Configurações do compilador TypeScript.

## Instalação e Execução
1. Pré-requisitos:
  - Node.js instalado na máquina.
2. Clonar o repositório:
```
git clone https://github.com/GabrielFrois/atividade-servidor-de-dados-espaciais.git server
```
3. Instalar as dependências:
```
cd server
npm install
```
4. Iniciar o servidor:
```
npm run dev
```
O servidor estará disponível em http://localhost:3001.

## Rotas Disponíveis
1. `/cidade`
Retorna um array com todas as cidades do país.

**Exemplo de resposta**:
```json
[
  {
    "id": 5589,
    "nome": "Abadia de Goiás/GO",
    "lon": -49.43842,
    "lat": -16.75752
  },
  {
    "id": 5590,
    "nome": "Abadia dos Dourados/MG",
    "lon": -47.40341,
    "lat": -18.48653
  }
]
```
2. `/cidade/:id`
Retorna os dados de irradiação solar para a cidade com o ID especificado.

**Parâmetros**:
- `id`: ID da cidade.

**Exemplo de requisição**:
```
/cidade/5589
```
**Exemplo de Resposta**:
```json
{
  "id": 54671,
  "anual": 5256,
  "jan": 5511,
  "fev": 5570,
  "mar": 5239,
  "abr": 5111,
  "mai": 4812,
  "jun": 4564,
  "jul": 4712,
  "ago": 5583,
  "set": 5496,
  "out": 5551,
  "nov": 5422,
  "dez": 5507,
  "geom": "POLYGON((-49.49904517870647 -16.8504614341756,-49.49904517870647 -16.750461434175598,-49.399045178706466 -16.750461434175598,-49.399045178706466 -16.8504614341756,-49.49904517870647 -16.8504614341756))"
}
```

### Carregamento dos Dados no Banco de Dados
1. Crie um banco de dados no PostgreSQL;
2. Edite o arquivo `.env` com os parâmetros de conexão apropriados (usuário, senha, host e nome do banco);
3. No pgAdmin (ou outro cliente PostgreSQL), copie os comandos do arquivo `data/comandos.sql` e cole para executar os comando para criar as tabelas no banco de dados;
4. Execute o comando `npm run load` para carregar os arquivos `data/cidade.geojson` e `data/global_horizontal_means.geojson` nas tabelas `cidades` e `irradiancias`, respectivamente.

### Base de dados
O LABREN – Laboratório de Modelagem e Estudos de Recursos Renováveis de Energia do INPE gerou o Altas Brasileiro de Energia Solar de 2017 (http://labren.ccst.inpe.br/atlas_2017.html). A base é composta de 72272 registros contendo as médias anuais e mensais do total diário da irradiação Global Horizontal, Difusa, Direta Normal, no Plano Inclinado e PAR em Wh/m2.dia.
Resolução espacial de 0,1° x 0,1° (aproximadamente 10 km x 10 km).
Longitude e latitude definem o centroide das entidades, ou células, de 0,1° x 0,1°.
Os dados estão na pasta `data` do repositório.

## Tecnologias Utilizadas
- Node.js
- Express
