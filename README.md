## Servidor de dados espaciais

### Base de dados
O LABREN – Laboratório de Modelagem e Estudos de Recursos Renováveis de Energia do INPE gerou o Altas Brasileiro de Energia Solar de 2017 (http://labren.ccst.inpe.br/atlas_2017.html). A base é composta de 72272 registros contendo as médias anuais e mensais do total diário da irradiação Global Horizontal, Difusa, Direta Normal, no Plano Inclinado e PAR em Wh/m2.dia.
Resolução espacial de 0,1° x 0,1° (aproximadamente 10 km x 10 km).
Longitude e latitude definem o centroide das entidades, ou células, de 0,1° x 0,1°.
Os dados estão na pasta `data` do repositório. 

### Descrição da atividade
Fazer um servidor Node.js com Express com duas rotas:
1.	Rota `/cidade`: retorna um array com todos as cidades do país. Exemplo de resposta:
```
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
2.	Rota `/cidade/:id`: retorna os dados de irradiação que cobrem a cidade fornecida pelo ID. No exemplo a seguir foi usado o ID da cidade de *Abadia de Goiás* `/cidade/5589`:
```
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

### Instalação
1. Clone o repositório:
```
git clone https://github.com/arleysouza/dw2-atv6.git server
```
2. Acesse o diretório do projeto e instale as dependências:
```
cd server
npm install
```

### Carregamento dos Dados no Banco de Dados
1. Crie um banco de dados no PostgreSQL;
2. Edite o arquivo `.env` com os parâmetros de conexão apropriados (usuário, senha, host e nome do banco);
3. No pgAdmin (ou outro cliente PostgreSQL), copie os comandos do arquivo `data/comandos.sql` e cole para excecutar os comando para criar as tabelas no banco de dados;
4. Execute o comando `npm run load` para carregar os arquivos `data/cidade.geojson` e `data/global_horizontal_means.geojson` nas tabelas `cidades` e `irradiancias`, respectivamente.