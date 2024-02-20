const { jsonMsg } = require("../util/messages.js");

async function fetchResultsByRaceID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please use a valid race ID");
        return;
    }

    const { data, error } = await sb
        .from('results')
        .select(`resultId, number, grid, position,
            drivers(driverRef, code, forename, surname),
            races(raceId, name, round, year, date), 
            constructors(name, constructorRef, nationality)
        `)
        .eq('raceId', raceId)
        .order('grid', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'results' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races correspond to the given 'raceId'.");
        return;
    }

    res.json(data);
}

async function fetchResultsByDriverRef(req, res, sb) {
    const driverRef = req.params.ref;

    if (!driverRef) {
        jsonMsg(res, "Please use a valid driverRef");
        return;
    }

    const { data, error } = await sb
        .from('results')
        .select(`
            *, drivers!inner(forename, surname)
        `)
        .eq('drivers.driverRef', driverRef);

    if (error) {
        jsonMsg(res, "Error fetching from 'results' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races correspond to the given 'driverRef'.");
        return;
    }

    res.json(data);
}

async function fetchResultsByDriverRefAndSeason(req, res, sb) {
    const driverRef = req.params.ref;
    const startYear = parseInt(req.params.start);
    const endYear = parseInt(req.params.end);

    if (!driverRef || !startYear || !endYear) {
        jsonMsg(res, "Please use a valid driverRef");
        return;
    }

    if (startYear > endYear) {
        jsonMsg(res, "startYear cannot be greater than endYear. Please pick a valid year range.");
        return;
    }

    const { data, error } = await sb
        .from('results')
        .select(`
            *, drivers!inner(forename, surname), races!inner(year)
        `)
        .eq('drivers.driverRef', driverRef)
        .gte('races.year', startYear)
        .lte('races.year', endYear);

    if (error) {
        jsonMsg(res, "Error fetching from 'results' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races correspond to the given 'driverRef'.");
        return;
    }

    res.json(data);
}

module.exports = {
    fetchResultsByRaceID,
    fetchResultsByDriverRef,
    fetchResultsByDriverRefAndSeason
};