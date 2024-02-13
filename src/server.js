const express = require('express');

const server = express();
server.use(express.json());

const controller = require('./controllers/f1-controller.js');
controller.handleSeasons(server);
controller.handleCircuits(server);
controller.handleConstructors(server);

const port = 8080;
server.listen(port, () => {
    console.log(`F1 Server Listetning on port: ${port}
    
    Sample Routes: 
    http://localhost:${port}/api/seasons
    http://localhost:${port}/api/circuits/albert_park
    http://localhost:${port}/api/circuits
    `);
});
