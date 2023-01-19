import app from "./app.js";
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || '4000';
const port = parseInt(PORT); 

app.listen({
	port: port,
}).then(() => {
	console.log("HHTP server is running");
});