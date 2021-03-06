// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3000;
// const server = http.createServer(app);

// server.listen(port);

const http = require('http');
const date = require('./date_time.js');
const PORT = process.env.PORT || 5000;

const server = http.createServer(async(req, res) => {

    if(req.url === "/api" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("url: " + req.url + " The current date and time are: " + date.dateTime());
        res.end();
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});