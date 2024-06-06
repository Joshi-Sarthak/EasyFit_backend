require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const app = express();

app.use(cors({ origin: `https://easyfit-workouts.vercel.app/` }));

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
``;
