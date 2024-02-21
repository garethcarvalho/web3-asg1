const { jsonMsg } = require("../util/messages.js");

async function fetchAllDrivers(res, sb) {
    const { data, error } = await sb
        .from('drivers')
        .select();
    
    if (error) {
        jsonMsg(res, "Error fetching from 'drivers' table.", error);
        return;
    }

    res.json(data);
}

async function fetchDriverByRef(req, res, sb) {
    const driverRef = req.params.ref;

    if (!driverRef) {
        jsonMsg(res, "Please enter a valid driver ref.");
        return;
    }

    const { data, error } = await sb
        .from('drivers')
        .select()
        .eq('driverRef', driverRef);

    if (error) {
        jsonMsg(res, "Error fetching from 'drivers' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No driver corresponding to driverRef: '${driverRef}'`);
        return;
    }

    res.json(data);
}

async function fetchDriverByNameSearch(req, res, sb) {
    const subStr = req.params.substring

    if (!subStr) {
        jsonMsg(res, "Please enter a valid substring to search");
        return;
    }

    const { data, error } = await sb
        .from('drivers')
        .select()
        .ilike('surname', `%${subStr}%`);
    
    if (error) {
        jsonMsg(res, "Error fetching from the 'drivers' table", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, "No driver matches the provided pattern '" + subStr + "'.");
        return;
    }

    res.json(data);
}

async function fetchDriversByRaceID(req, res, sb) {
    const raceId = req.params.raceId;

    if (!raceId) {
        jsonMsg(res, "Please enter a valid race ID.");
        return;
    }

    const { data, error } = await sb
        .from('driver_standings')
        .select('drivers(*)')
        .eq('raceId', raceId);
    
    if (error) {
        jsonMsg(res, "Error fetching from 'drivers_standings' table.", error);
        return;
    }

    if (!data.length) {
        jsonMsg(res, `No races corresponding to race ID: '${raceId}'`);
        return;
    }

    res.json(data);
}

module.exports = {
    fetchAllDrivers,
    fetchDriverByRef,
    fetchDriverByNameSearch,
    fetchDriversByRaceID
};