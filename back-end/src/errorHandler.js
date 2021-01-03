function errorHandler (error, res) {
    if (error.message === 'not authorized') {
        res.status(401).send('Not Authorized');
    } else if (error.message === 'no data') {
        res.status(402).send('No Data');
    } else {
        console.log(error);
        res.status(418).send('Unrecognized error');
    }
}

module.exports = { errorHandler };