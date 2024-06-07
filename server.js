require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// Security middlewares
app.use(helmet());
app.use(compression());

const allowedOrigins = ["https://easyfit-workouts.vercel.app", "http://localhost:5173"];

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			} else {
				const msg = "The CORS policy for this site does not allow access from the specified origin.";
				return callback(new Error(msg), false);
			}
		},
		credentials: true, // If you need to allow cookies or authentication headers
	})
);

app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then((result) => {
		console.log("connected to DB");
		app.listen(process.env.PORT, () => {
			console.log("listening on port ", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
