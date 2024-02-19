const { jsonMsg } = require('../util/messages.js');

async function fetchAllCircuits(res, sb) {
    const { data, error } = await sb
        .from('circuits')
        .select();
    
    if (error) {
        jsonMsg(res, "Error fetching from 'circuits' table", error);
        return;
    }

    res.json(data);
}

async function fetchCircuitByRef(req, res, sb) {
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

    if (!data.length) {
        jsonMsg(res, "Provided `ref` does not correspond to any existing circuit.");
        return;
    }
    
    res.json(data);
}

async function fetchCircuitBySeason(req, res, sb) {
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

    if (!data.length) {
        jsonMsg(res, "Provided `year` has no circuits used.");
        return;
    }
    
    res.json(data);
}

module.exports = {
    fetchAllCircuits,
    fetchCircuitByRef,
    fetchCircuitBySeason
}