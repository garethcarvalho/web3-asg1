const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPA_URL, process.env.SUPA_API_KEY);

function handleSeasons(server) {
    server.get('/api/seasons', async (req, res) => {
        const { data, error } = await sb
            .from('seasons')
            .select();

        if (error) {
            jsonMsg(res, "Error fetching from 'seasons' table");
            return;
        }
        
        res.json(data);
    });
}



module.exports = {
    handleSeasons
};

/**
 * Sends a json message through the response `res` object.
 * @param {*} res - The object representing the response. Must have a `json()` function.
 * @param {string} msg - The message you want to send.
 */
function jsonMsg(res, msg) {
    res.json({message: msg});
}