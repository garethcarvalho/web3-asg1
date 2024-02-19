const express = require('express');

const app = express();
app.use(express.json());

const routes = require('./routes.js');
routes.handleSeasons(app);
routes.handleCircuits(app);
routes.handleConstructors(app);
routes.handleDrivers(app);
routes.handleRaces(app);

const port = 8080;
app.listen(port, () => {
    console.log(`F1 Server Listetning on port: ${port}
    
    Sample Routes: 
    http://localhost:${port}/api/seasons
    http://localhost:${port}/api/circuits
    http://localhost:${port}/api/circuits/albert_park
    http://localhost:${port}/api/circuits/season/2020
    http://localhost:${port}/api/constructors
    http://localhost:${port}/api/constructors/mercedes
    http://localhost:${port}/api/drivers
    http://localhost:${port}/api/drivers/hamilton
    `);
});
