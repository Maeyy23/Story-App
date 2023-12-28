// Importing installed libraries
const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

// environment variables configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//Database Connection
const connectDB = require("./configs/database");
connectDB(process.env.MONGO_URI);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use(limiter);
app.use(express.json());
app.use(
  morgan("default", {
    /*options */
  })
);
app.use("/", require("./routes/index"));

// Configure express-handlebars
const hbs = exphbs.create({ defaultLayout: "main", extname: ".hbs" });
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Initializing server
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Up and Running",
  });
});
// Server Listening
app.listen(PORT, () => {
  console.log(`Server is Listening actively at ${PORT}`);
});
