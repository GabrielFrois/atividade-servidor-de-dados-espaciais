import express from 'express';
import dotenv from 'dotenv';
import pool from './controllers/db';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/cidade', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nome, 
             ST_X(geom) as lon, 
             ST_Y(geom) as lat
      FROM cidades
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
});

app.get('/cidade/:id', async function (req, res) {
  const cidadeId = req.params.id;

  try {
    const cidadeResult = await pool.query(`
      SELECT geom FROM cidades WHERE id = $1
    `, [cidadeId]);

    if (cidadeResult.rowCount === 0) {
      return res.status(404).json({ error: 'Cidade não encontrada' });
    }

    const cidadeGeom = cidadeResult.rows[0].geom;

    const incidenciaResult = await pool.query(`
      SELECT id, anual, jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez,
             ST_AsText(geom) AS geom
      FROM incidencias
      WHERE ST_Intersects(geom, $1::geometry)
      LIMIT 1
    `, [cidadeGeom]);

    if (incidenciaResult.rowCount === 0) {
      return res.status(404).json({ error: 'Nenhum dado de irradiação encontrado para esta cidade' });
    }

    res.json(incidenciaResult.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar incidencias:', error);
    res.status(500).json({ error: 'Erro ao buscar incidencias' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
