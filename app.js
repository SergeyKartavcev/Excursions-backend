const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PORT, HOST_URI } = process.env;
const app = express();
const excursionsRouters = require("./routers/excursions");
const videosRouters = require("./routers/videos");
const usersRouter = require("./routers/users");
const authRouter = require('./routers/auth');
const mapRouter = require('./routers/map');
const reviewRouter = require('./routers/review');


app.use(cors());
app.use(express.json());
app.use("/excursions", excursionsRouters);
app.use("/videos", videosRouters);
app.use("/user", usersRouter);
app.use('/auth', authRouter);
app.use('/map', mapRouter);
app.use('/review', reviewRouter);

async function main() {
  try {
    mongoose.connect(HOST_URI);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}` );
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
