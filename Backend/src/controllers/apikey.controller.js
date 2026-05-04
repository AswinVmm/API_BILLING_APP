const crypto = require("crypto");
const prisma = require("../config/db");

exports.generateKey = async (req, res) => {
    const { apiId } = req.body;

    const key = crypto.randomBytes(32).toString("hex");

    const apiKey = await prisma.apiKey.create({
        data: {
            key,
            status: "active",
            apiId
        }
    });

    res.json(apiKey);
};