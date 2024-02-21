const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPA_URL, process.env.SUPA_API_KEY);

const seasonsController = require('./controllers/seasonsController.js');
const circuitsController = require('./controllers/circuitsController.js');
const constructorsController = require('./controllers/constructorsController.js');
const driversController = require('./controllers/driversController.js');
const racesController = require('./controllers/racesController.js');
const resultsController = require('./controllers/resultsController.js');
const qualifyingController = require('./controllers/qualifyingController.js');
const standingsController = require('./controllers/standingsController.js');

function handleSeasons(app) {
    app.get('/api/seasons', (req, res) => {
        seasonsController.fetchAllSeasons(res, sb);
    });
}

function handleCircuits(app) {
    app.get('/api/circuits', (req, res) => {
        circuitsController.fetchAllCircuits(res, sb);
    });

    app.get('/api/circuits/:ref', (req, res) => {
        circuitsController.fetchCircuitByRef(req, res, sb);
    });

    app.get('/api/circuits/season/:year', (req, res) => {
        circuitsController.fetchCircuitBySeason(req, res, sb);
    });
}

function handleConstructors(app) {
    app.get('/api/constructors', (req, res) => {
        constructorsController.fetchAllConstructors(res, sb);
    });

    app.get('/api/constructors/:ref', (req, res) => {
        constructorsController.fetchConstructorByRef(req, res, sb);
    });

    /* Removed from assignment. Wasn't finished anyway WOOOO */
    // app.get('/api/constructors/season/:year', (req, res) => {
    //     constructorsController.fetchConstructorBySeason(req, res, sb);
    // });
}

function handleDrivers(app) {
    app.get('/api/drivers', (req, res) => {
        driversController.fetchAllDrivers(res, sb);
    });

    app.get('/api/drivers/:ref', (req, res) => {
        driversController.fetchDriverByRef(req, res, sb);
    });

    app.get('/api/drivers/search/:substring', (req, res) => {
        driversController.fetchDriverByNameSearch(req, res, sb);
    });

    app.get('/api/drivers/race/:raceId', (req, res) => {
        driversController.fetchDriversByRaceID(req, res, sb);
    });
}

function handleRaces(app) {
    app.get('/api/races/:raceId', (req, res) => {
        racesController.fetchRaceByID(req, res, sb);
    });

    app.get('/api/races/season/:year', (req, res) => {
        racesController.fetchRacesBySeason(req, res, sb);
    });

    app.get('/api/races/season/:year/:round', (req, res) => {
        racesController.fetchRacesBySeasonAndRound(req, res, sb);
    });

    app.get('/api/races/circuits/:ref', (req, res) => {
        racesController.fetchRacesByCircuitRef(req, res, sb);
    });

    app.get('/api/races/circuits/:ref/seasons/:start/:end', (req, res) => {
        racesController.fetchRacesByRefAndSeasons(req, res, sb);
    });
}

function handleResults(app) {
    app.get('/api/results/:raceId', (req, res) => {
        resultsController.fetchResultsByRaceID(req, res, sb);
    });

    app.get('/api/results/driver/:ref', (req, res) => {
        resultsController.fetchResultsByDriverRef(req, res, sb);
    });

    app.get('/api/results/driver/:ref/seasons/:start/:end', (req, res) => {
        resultsController.fetchResultsByDriverRefAndSeason(req, res, sb);
    });
}

function handleQualifying(app) {
    app.get('/api/qualifying/:raceId', (req, res) => {
        qualifyingController.fetchQualifyingByRaceID(req, res, sb);
    });
}

function handleStandings(app) {
    app.get('/api/standings/:raceId/drivers', (req, res) => {
        standingsController.fetchDriverStandingsByRaceID(req, res, sb);
    });

    app.get('/api/standings/:raceId/constructors', (req, res) => {
        standingsController.fetchConstructorStandingsByRaceID(req, res, sb);
    });
}

module.exports = {
    handleSeasons,
    handleCircuits,
    handleConstructors,
    handleDrivers,
    handleRaces,
    handleResults,
    handleQualifying,
    handleStandings
};