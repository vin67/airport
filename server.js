'use strict';

const express = require('express');
const app = express();
const airline = require('./app');

app.set('port', process.env.PORT || 3000);

app.use(require('morgan')('combined', {
    stream: {
        write: message => {
            // Write to logs
            airline.logger.log('info', message);
        }
    }
}));

app.use('/', airline.router);

app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});

module.exports = app; //for testing