// Importing installed libraries
const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

// environment variables configurations
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// Passport config
require("./configs/passport")(passport);

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
  morgan("combined", {
    /*options */
  })
);
app.use("/", require("./routes/index"));

// Configure express-handlebars
const hbs = exphbs.create({ defaultLayout: "main", extname: ".hbs" });
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// express-session middleware
app.use(
  session({
    secret: "Joy",
    resave: false,
    saveUninitialized: false,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));
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
