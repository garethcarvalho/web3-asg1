const { jsonMsg } = require('../util/messages.js');

async function fetchAllSeasons(res, sb) {
    const { data, error } = await sb
        .from('seasons')
        .select();

    if (error) {
        jsonMsg(res, "Error fetching from 'seasons' table", error);
        return;
    }
    
    res.json(data);
}

module.exports = {
    fetchAllSeasons
};