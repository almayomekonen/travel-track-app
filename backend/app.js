const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./models/http-error");
const upload = require("./middleware/file-upload");
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// Handle file upload route
app.post("/upload", upload.single("file"), (req, res, next) => {
  res.status(200).json({ message: "File uploaded successfully!" });
});

// 404 Not Found
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (req.file && req.file.path) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error deleting file:", err);
      }
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  // Ensure status code is valid
  const validStatusCode =
    typeof error.code === "number" && error.code >= 100 && error.code < 600;
  const statusCode = validStatusCode ? error.code : 500;

  res.status(statusCode).json({
    message: error.message || "An unknown error occurred!",
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`
  )
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
