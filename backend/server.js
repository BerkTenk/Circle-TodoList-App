const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.post('/api/initialize_user', async (req, res) => {
    const idempotencyKey = req.body.idempotencyKey || require("uuid").v4();

    const options = {
        method: "POST",
        url: 'https://api.circle.com/v1/w3s/user/initialize',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "X-User-Token": userToken,
          },
          data: {
            idempotencyKey: idempotencyKey,
            blockchains: ["MATIC-AMOY"],
          },
    };

    try {
        const response = await axios.request(options);
        res.status(200).json({challangeId: response.data.data.challangeId});

    } catch(error) {
        console.error("Error in API request:", error.response?.data);
    }
});

const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => console.log(`Server is running on port ${PORT}`));