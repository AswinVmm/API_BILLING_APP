const express = require("express");
const axios = require("axios");
const Redis = require("ioredis");
const { PrismaClient } = require("@prisma/client");
const { Queue } = require("bullmq");
const prisma = new PrismaClient();
const redis = new Redis();


const queue = new Queue("log");
const app = express();

app.use('/api/:apiId/*', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    // Validate key
    const key = await prisma.apiKey.findUnique({
        where: { key: apiKey },
        include: { api: true }
    });

    await queue.add("log", {
        apiKeyId: key.id,
        endpoint: req.originalUrl,
        status: 200
    });

    if (!key) return res.status(403).send("Invalid key");

    // Rate limit
    const count = await redis.incr(apiKey);
    if (count === 1) await redis.expire(apiKey, 60);
    if (count > 100) return res.status(429).send("Rate limit");

    // Forward request
    const response = await axios({
        url: key.api.baseUrl + req.path,
        method: req.method,
        data: req.body
    });

    res.send(response.data);
});

app.listen(6000, () => console.log("Gateway running"));