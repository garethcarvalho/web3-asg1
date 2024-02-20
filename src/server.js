const express = require('express');

const app = express();
app.use(express.json());

const routes = require('./routes.js');

routes.handleSeasons(app);
routes.handleCircuits(app);
routes.handleConstructors(app);
routes.handleDrivers(app);
routes.handleRaces(app);
routes.handleResults(app);
routes.handleQualifying(app);
routes.handleStandings(app);

const port = 8080;
app.listen(port, () => {
    console.log(`F1 Server Listening on port: ${port}
    
    Sample Routes: 
    http://localhost:${port}/api/seasons

    http://localhost:${port}/api/circuits
    http://localhost:${port}/api/circuits/albert_park
    http://localhost:${port}/api/circuits/season/2020

    http://localhost:${port}/api/constructors
    http://localhost:${port}/api/constructors/mercedes

    http://localhost:${port}/api/drivers
    http://localhost:${port}/api/drivers/hamilton
    http://localhost:${port}/api/drivers/search/ham
    http://localhost:${port}/api/drivers/race/1

    http://localhost:${port}/api/races/1
    http://localhost:${port}/api/races/season/2020
    http://localhost:${port}/api/races/season/2020/3
    http://localhost:${port}/api/races/circuits/albert_park
    http://localhost:${port}/api/races/circuits/albert_park/seasons/2001/2004

    http://localhost:${port}/api/results/1
    http://localhost:${port}/api/results/driver/hamilton
    http://localhost:${port}/api/results/driver/hamilton/seasons/2020/2021

    http://localhost:${port}/api/qualifying/1

    http://localhost:${port}/api/standings/drivers/1
    http://localhost:${port}/api/constructors/drivers/1
    `);
});
