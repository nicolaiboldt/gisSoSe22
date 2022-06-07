const http = require("http");

const hostname = "127.0.0.1"; // localhost
const port = 3000;

let winnerData = "";

const server = http.createServer((request, response) => {
    if (request.method === "POST") {
        let jsonString = "";
        request.on("data", (data) => {
            jsonString += data;
        });
        request.on("end", () => {
            console.log(JSON.parse(jsonString));
            winnerData += JSON.stringify(jsonString);
        });
    }

    if (request.method === "GET") {
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("GET-Request");
        response.write(winnerData);
        winnerData = "";
        response.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});