const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPA_URL, process.env.SUPA_API_KEY);

function handleSeasons(server) {
    server.get('/api/seasons', async (req, res) => {
        const { data, error } = await sb
            .from('seasons')
            .select();

        if (error) {
            jsonMsg(res, "Error fetching from 'seasons' table", error);
            return;
        }
        
        res.json(data);
    });
}

function handleCircuits(server) {
    server.get('/api/circuits', async (req, res) => {
        const { data, error } = await sb
            .from('circuits')
            .select();
        
        if (error) {
            jsonMsg(res, "Error fetching from 'circuits' table", error);
            return;
        }

        res.json(data);
    });

    server.get('/api/circuits/:ref', async (req, res) => {
        const circuitRef = req.params.ref;

        if (typeof(circuitRef) === 'undefined') {
            jsonMsg(res, 'Enter a valid circuit reference.');
            return;
        }

        const { data, error } = await sb
            .from('circuits')
            .select()
            .eq('circuitRef', circuitRef);
        
        if (error) {
            jsonMsg(res, "Error fetching from 'circuits' table", error);
            return;
        }
        
        res.json(data);
    });

    server.get('/api/circuits/season/:year', async (req, res) => {
        const year = req.params.year;
        
        if (typeof(year) === 'undefined') {
            jsonMsg(res, 'Enter a valid year.');
            return;
        }

        const { data, error } = await sb
            // .from('circuits')
            // .select(`*, races!inner(year, round)`)
            // .eq('races.year', year);
            .from('races')
            .select('year, round, circuits!inner(*)')
            .eq('year', year)
            .order('round', { ascending: true });
        
        if (error) {
            jsonMsg(res, "Error fetching from 'circuits' table", error);
            return;
        }
        
        res.json(data);
    });
}

function handleConstructors(server) {
    server.get('/api/constructors', async (req, res) => {
        const { data, error } = await sb
            .from('constructors')
            .select();

        if (error) {
            jsonMsg(res, "Error fetching from 'constructors' table", error);
            return;
        }
        
        res.json(data);
    });

    server.get('/api/constructors/:ref', async (req, res) => {
        const constructorRef = req.params.ref;

        if (typeof(constructorRef) === 'undefined') {
            jsonMsg(res, 'Enter a valid constructor reference.');
            return;
        }

        const { data, error } = await sb
            .from('constructors')
            .select()
            .eq('constructorRef', constructorRef);
        
        if (error) {
            jsonMsg(res, "Error fetching from 'constructors' table", error);
            return;
        }
        
        res.json(data);
    });

    server.get('/api/constructors/season/:year', async (req, res) => {
        const year = req.params.year;
        
        if (typeof(year) === 'undefined') {
            jsonMsg(res, 'Enter a valid year.');
            return;
        }

        const { data, error } = await sb
            .from('constructor_standings')
            .select('constructors(constructorId), races()')
            .eq('races.year', year);
            
        if (error) {
            jsonMsg(res, "Error fetching from 'constructors' table", error);
            return;
        }
        
        res.json(data);
    });
}

module.exports = {
    handleSeasons,
    handleCircuits,
    handleConstructors
};

/**
 * Sends a json message through the response `res` object.
 * @param {*} res - The object representing the response. Must have a `json()` function.
 * @param {string} msg - The message you want to send.
 */
function jsonMsg(res, msg, error = null) {
    res.json({message: msg});
    if (error)
        console.log(error);
}