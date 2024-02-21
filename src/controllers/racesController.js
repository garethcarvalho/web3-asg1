const { jsonMsg } = require("../util/messages.js");

async function fetchRaceByID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please use a valid race ID.");
        return;
    }

    const { data, error } = await sb
        .from('races')
        .select('raceId, year, round, name, date, time, url, circuits(name, location, country)')
        .eq('raceId', raceId);

    if (error) {
        jsonMsg(res, "Error fetching from 'races' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races correspond with the provided race ID.");
        return;
    }

    res.json(data);
}

async function fetchRacesBySeason(req, res, sb) {
    const year = parseInt(req.params.year);

    if (!year) {
        jsonMsg(res, "Please enter a valid year.");
        return;
    }

    const { data, error } = await sb
        .from('races')
        .select()
        .eq('year', year)
        .order('round', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'races' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races corresponding to provided year.");
        return;
    }

    res.json(data);
}

async function fetchRacesBySeasonAndRound(req, res, sb) {
    const year = parseInt(req.params.year);
    const round = parseInt(req.params.round);

    if (!year || !round) {
        jsonMsg(res, "Please enter a valid year and round.");
        return;
    }

    const { data, error } = await sb
        .from('races')
        .select()
        .eq('year', year)
        .eq('round', round)
        .order('round', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'races' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No races corresponding to provided year, or invalid round value");
        return;
    }

    res.json(data);
}

async function fetchRacesByCircuitRef(req, res, sb) {
    const circuitRef = req.params.ref;

    if (!circuitRef) {
        jsonMsg(res, "Please provide a valid circuit reference");
        return;
    }

    const { data, error } = await sb
        .from('races')
        .select('*, circuits!inner(name)')
        .eq('circuits.circuitRef', circuitRef)
        .order('year', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'races' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No circuits corresponding to the circuitRef: ${circuitRef}`);
        return;
    }

    res.json(data);
}

async function fetchRacesByRefAndSeasons(req, res, sb) {
    const circuitRef = req.params.ref;
    const startYear = req.params.start;
    const endYear = req.params.end;

    if (!circuitRef || !startYear || !endYear) {
        jsonMsg(res, "Please provide a valid circuit reference, as well as start and end year.");
        return;
    }

    if (startYear > endYear) {
        jsonMsg(res, "startYear cannot be greater than endYear. Please pick a valid year range.");
        return;
    }

    const { data, error } = await sb
        .from('races')
        .select('*, circuits!inner(name)')
        .eq('circuits.circuitRef', circuitRef)
        .gte('year', startYear)
        .lte('year', endYear)
        .order('year', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'races' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No circuits corresponding to the circuitRef: ${circuitRef}, or no races take place between the years ${startYear} and ${endYear}`);
        return;
    }

    res.json(data);
}

module.exports = {
    fetchRaceByID,
    fetchRacesBySeason,
    fetchRacesBySeasonAndRound,
    fetchRacesByCircuitRef,
    fetchRacesByRefAndSeasons
};