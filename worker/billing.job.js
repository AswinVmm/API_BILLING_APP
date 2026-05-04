const prisma = require("../backend/src/config/db");

async function runBilling() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const requests = await prisma.usageLog.count({
            where: { apiKeyId: user.id }
        });

        let amount = 0;

        if (requests > 1000) {
            amount = ((requests - 1000) / 100) * 0.5;
        }

        await prisma.billing.create({
            data: {
                userId: user.id,
                totalRequests: requests,
                amount,
                status: "unpaid"
            }
        });
    }
}

runBilling();