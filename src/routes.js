const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPA_URL, process.env.SUPA_API_KEY);

const seasonsController = require('./controllers/seasonsController.js');
const circuitsController = require('./controllers/circuitsController.js');
const constructorsController = require('./controllers/constructorsController.js');

function handleSeasons(server) {
    server.get('/api/seasons', (req, res) => {
        seasonsController.fetchAllSeasons(res, sb);
    });
}

function handleCircuits(server) {
    server.get('/api/circuits', (req, res) => {
        circuitsController.fetchAllCircuits(res, sb);
    });

    server.get('/api/circuits/:ref', (req, res) => {
        circuitsController.fetchCircuitByRef(req, res, sb);
    });

    server.get('/api/circuits/season/:year', (req, res) => {
        circuitsController.fetchCircuitBySeason(req, res, sb);
    });
}

function handleConstructors(server) {
    server.get('/api/constructors', (req, res) => {
        constructorsController.fetchAllConstructors(res, sb);
    });

    server.get('/api/constructors/:ref', (req, res) => {
        constructorsController.fetchConstructorByRef(req, res, sb);
    });

    server.get('/api/constructors/season/:year', (req, res) => {
        constructorsController.fetchConstructorBySeason(req, res, sb);
    });
}

module.exports = {
    handleSeasons,
    handleCircuits,
    handleConstructors
};