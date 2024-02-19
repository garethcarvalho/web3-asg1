async function fetchAllConstructors(res, sb) {
    const { data, error } = await sb
        .from('constructors')
        .select();

    if (error) {
        jsonMsg(res, "Error fetching from 'constructors' table", error);
        return;
    }
    
    res.json(data);
}

async function fetchConstructorByRef(req, res, sb) {
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

    if (!data.length) {
        jsonMsg(res, "Provided `ref` does not correspond to any existing constructor.");
        return;
    }
    
    res.json(data);
}

async function fetchConstructorBySeason(req, res, sb) {
    // Unfinished
    // TODO: Figure out a query to grab unique constructors
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
}

module.exports = {
    fetchAllConstructors,
    fetchConstructorByRef,
    fetchConstructorBySeason
}