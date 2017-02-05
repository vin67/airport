'use strict';

const routes = require('express').Router();
const rp = require('request-promise-native');
const logger = require('../logger');

const options = {
    uri: 'https://www.qantas.com.au/api/airports',
    json: false,
    method: 'GET'
};


routes.get('/airports', function (req, res) {
    logger.log('info', 'in function /airports' );

    rp(options)
        .then(function (data) {
            let airports = JSON.parse(data).airports;
            res.status(200).json({
                airports
            });
        })
        .catch(function (err) {
            logger.log('error', `error: ${err.message}`);
            res.status(err.statusCode).json(err);
            return;
        });
});

routes.get('/airports/airport-code/:airportId', function (req, res) {
    logger.log('info', 'in function /airports/airport-code/:airportId' );

    const code = req.params.airportId;

    rp(options)
        .then(function (data) {

            let airports = JSON.parse(data).airports;
            var airport = airports.filter(function (item) {
                return item.code === code;
            });
            res.status(200).json({
                airport
            });
        })
        .catch(function (err) {
            logger.log('error', `error: ${err.message}`);
            res.status(err.statusCode).json(err);
            return;
        });
});


routes.get('/airports/country-code/:countryId', function (req, res) {
    logger.log('info', 'in function /air/country-code/:countryId' );

    const code = req.params.countryId;

    let airportIsDomestic = undefined;
    let airportIsInternational = undefined;
    let airport = [];

    if (req.query.dom === 'true')
        airportIsDomestic = Boolean(true);
    else if (req.query.dom === 'false')
        airportIsDomestic = Boolean(false);
    else
        airportIsDomestic = undefined;

    if (req.query.int === 'true')
        airportIsInternational = Boolean(true);
    else if (req.query.int === 'false')
        airportIsInternational = Boolean(false);
    else airportIsInternational = undefined;
    
    logger.log('info', `filters - airportIsDomestic : ${airportIsDomestic}, airportIsInternational: ${airportIsInternational} `);

    rp(options)
        .then(function (data) {

            let airports = JSON.parse(data).airports;

            if (airportIsDomestic === undefined && airportIsInternational === undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code
                });

            } else if (airportIsDomestic === undefined && airportIsInternational !== undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code &&
                        item.international_airport === airportIsInternational;
                });

            } else if (airportIsDomestic !== undefined && airportIsInternational === undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code &&
                        item.regional_airport === airportIsDomestic;
                });

            } else {

                airport = airports.filter(function (item) {

                    return item.country.code === code &&
                        item.international_airport === airportIsInternational &&
                        item.regional_airport === airportIsDomestic;
                });

            }
            res.status(200).json({
                airport
            });
        })
        .catch(function (err) {
            logger.log('error', `error: ${err.message}`);
            res.status(err.statusCode).json(err);
            return;
        });
});



routes.get('/airports/country-code/:countryId/:airport-code/:airportId', function (req, res) {
    logger.log('info', 'in function /airports/country-code/:countryId/:airport-code/:airportId' );

    const code = req.params.countryId;
    const name = req.params.airportId;

    let airportIsDomestic = undefined;
    let airportIsInternational = undefined;
    let airport = [];

    if (req.query.dom === 'true')
        airportIsDomestic = Boolean(true);
    else if (req.query.dom === 'false')
        airportIsDomestic = Boolean(false);
    else
        airportIsDomestic = undefined;

    if (req.query.int === 'true')
        airportIsInternational = Boolean(true);
    else if (req.query.int === 'false')
        airportIsInternational = Boolean(false);
    else airportIsInternational = undefined;
    
    logger.log('info', `filters - airportIsDomestic : ${airportIsDomestic}, airportIsInternational: ${airportIsInternational} `);

    rp(options)
        .then(function (data) {

            let airports = JSON.parse(data).airports;

            if (airportIsDomestic === undefined && airportIsInternational === undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code &&
                        item.code === name;
                });

            } else if (airportIsDomestic === undefined && airportIsInternational !== undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code &&
                        item.code === name &&
                        item.international_airport === airportIsInternational;
                });

            } else if (airportIsDomestic !== undefined && airportIsInternational === undefined) {

                airport = airports.filter(function (item) {
                    return item.country.code === code &&
                        item.code === name &&
                        item.regional_airport === airportIsDomestic;
                });

            } else {

                airport = airports.filter(function (item) {

                    return item.country.code === code &&
                        item.code === req.params.airportId &&
                        item.international_airport === airportIsInternational &&
                        item.regional_airport === airportIsDomestic;
                });

            }
            res.status(200).json({
                airport
            });
        })
        .catch(function (err) {
            logger.log('error', `error: ${err.message}`);
            res.status(err.statusCode).json(err);
            return;
        });
});

routes.get('/', (req, res) => {
    logger.log('info', 'in function /' );

    res.status(200).json({
        message: 'Connected!'
    });
});

module.exports = routes;