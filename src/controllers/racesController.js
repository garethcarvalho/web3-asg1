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
    // TODO: Add round functionality.
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

module.exports = {
    fetchRaceByID,
    fetchRacesBySeason,
    fetchRacesBySeasonAndRound
};