
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");
require("dotenv").config();


const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); 

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  buckets: [0.1, 0.3, 0.5, 1, 2]
});


const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end(); 
  });
  next();
});


app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});



const pool = new Pool({
  host: process.env.POSTGRES_HOST || "postgres",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "shopmicro",
  port: 5432,
});


const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "redis"}:6379`,
});
redisClient.connect().catch(console.error);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend" });
});


app.get("/products", async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("products");
    if (cachedProducts) {
      console.log("Serving from cache");
      return res.json(JSON.parse(cachedProducts));
    }
    const result = await pool.query("SELECT id, name, price FROM products ORDER BY id");
    await redisClient.setEx("products", 30, JSON.stringify(result.rows));
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "backend_error", detail: err.message });
  }
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
