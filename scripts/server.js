/* eslint-disable no-unused-vars */
const http = require("http");
const mongodb = require("mongodb");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
const url = "mongodb://127.0.0.1:27017"; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);

let winnerData = "";

const db = mongoClient.db("tictactoe");
const highscores = db.collection("scores");

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

const server = http.createServer(async (request, response) => {
    if (request.method === "POST") {
        let jsonString = "";
        request.on("data", (data) => {
            jsonString = data;
            highscores.insertOne(JSON.parse(jsonString));
            console.log(JSON.parse(data));
        });

        response.end();
    }

    if (request.method === "GET") {
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("GET-Request");
        console.log(await (await highscores.find().toArray()).pop());
        response.write(JSON.stringify(await (await highscores.find().toArray()).pop()));
        response.end();
    }
});

startServer();