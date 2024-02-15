const express = require('express');

const server = express();
server.use(express.json());

const routes = require('./routes.js');
routes.handleSeasons(server);
routes.handleCircuits(server);
routes.handleConstructors(server);

const port = 8080;
server.listen(port, () => {
    console.log(`F1 Server Listetning on port: ${port}
    
    Sample Routes: 
    http://localhost:${port}/api/seasons
    http://localhost:${port}/api/circuits/albert_park
    http://localhost:${port}/api/circuits
    `);
});
