require('dotenv').config();
const express = require('express');
const redis = require('redis');
const path = require('path');
const shortid = require('shortid');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'templates')));

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.connect().catch(console.error);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'URL is required' });

    const shortCode = shortid.generate();
    await redisClient.set(shortCode, longUrl);

    res.json({ shortUrl: `http://localhost:${process.env.PORT}/${shortCode}` });
});

app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const longUrl = await redisClient.get(shortCode);

    if (!longUrl) return res.status(404).json({ error: 'URL not found' });

    res.redirect(longUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
