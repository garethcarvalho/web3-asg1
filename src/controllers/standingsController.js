const { jsonMsg } = require("../util/messages");

async function fetchDriverStandingsByRaceID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please enter a valid raceId");
        return;
    }

    const { data, error } = await sb
        .from('driver_standings')
        .select(`
            driverStandingsId, points, position, wins,
            drivers(driverRef, code, forename, surname), 
            races(name, round, year, date)
        `)
        .eq('raceId', raceId)
        .order('position', { ascending: true });0

    if (error) {
        jsonMsg(res, "Error fetching data from 'driver_standings' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No races corresponding to race ID: '${raceId}'`);
        return;
    }

    res.json(data);
}

async function fetchConstructorStandingsByRaceID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please enter a valid raceId");
        return;
    }

    const { data, error } = await sb
        .from('constructor_standings')
        .select(`
            constructorStandingsId, points, position, wins,
            constructors(name, constructorRef, nationality), 
            races(name, round, year, date)
        `)
        .eq('raceId', raceId)
        .order('position', { ascending: true });0

    if (error) {
        jsonMsg(res, "Error fetching data from 'constructor_standings' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No races corresponding to race ID: '${raceId}'`);
        return;
    }

    res.json(data);

}

module.exports = {
    fetchDriverStandingsByRaceID,
    fetchConstructorStandingsByRaceID
}