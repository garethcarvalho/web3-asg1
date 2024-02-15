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

module.exports = {
    jsonMsg
};