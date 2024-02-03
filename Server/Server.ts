import express from "express";
import cors from "cors";
import {createClient} from "redis";
const app = express(); 
const PORT = 4000 || 3000



const rc = createClient()



app.use(cors({
	origin: "http://localhost:5173/",
	methods: ["GET", "POST", "DELETE", "PUT"]
}))


async function reddisFunc( )
{
	try {
		await rc.connect()
		await rc.set("name", "sean")	
		const value = await rc.get("name");
		console.log(value)
		
	} catch (err) {
		console.log(err)
	}
}


reddisFunc()






app.on("listening", () => {
	console.log("Server started")
})

app.on("error", (error) => {
	console.log(`Error ${error}`)
})
app.listen(PORT, () => {
	console.log(`Server Listening on port ${PORT}`)
})