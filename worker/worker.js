const { Worker } = require("bullmq");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

new Worker("log", async job => {
    await prisma.usageLog.create({
        data: job.data
    });
});