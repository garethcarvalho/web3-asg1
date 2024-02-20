const { jsonMsg } = require("../util/messages");

async function fetchQualifyingByRaceID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please enter a valid raceId");
        return;
    }

    const { data, error } = await sb
        .from('qualifying')
        .select(`
            qualifyId, number, position, 
            drivers(driverRef, code, forename, surname),
            races!inner(name, round, year, date),
            constructors(name, constructorRef, nationality)
        `)
        .eq('raceId', raceId)
        .order('position', { ascending: true });

    if (error) {
        jsonMsg(res, "Error fetching from 'qualifying' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No results corresponding to the provided raceId");
        return;
    }

    res.json(data);
}

module.exports = {
    fetchQualifyingByRaceID
};