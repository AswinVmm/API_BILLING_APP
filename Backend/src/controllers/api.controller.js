const prisma = require("../config/db");

exports.createApi = async (req, res) => {
    const { name, baseUrl } = req.body;

    const api = await prisma.api.create({
        data: {
            name,
            baseUrl,
            userId: req.user.userId
        }
    });

    res.json(api);
};

exports.getApis = async (req, res) => {
    const apis = await prisma.api.findMany({
        where: { userId: req.user.userId }
    });

    res.json(apis);
};