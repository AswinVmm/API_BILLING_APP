require("dotenv").config();
const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/auth.routes");
const apiRoutes = require("./routes/api.routes");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));