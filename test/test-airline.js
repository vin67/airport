var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('100. Test cases for airport locations queries', function () {

    describe('100.10. Connectivity tests', function () {

        it('Should connect to localhost:3000 /GET', function (done) {
            chai.request(server)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Connected!');

                    done();

                });
        });
    });
});


describe('200. Tests resources without filters', function () {

    it('200.10. should list ALL aiports on /airports /GET', function (done) {
        chai.request(server)
            .get('/airports')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airports');
                res.body.airports.should.be.a('array');

                res.body.airports[0].should.have.property('code');
                res.body.airports[0].should.have.property('display_name');
                res.body.airports[0].should.have.property('international_airport');
                res.body.airports[0].should.have.property('regional_airport');
                res.body.airports[0].should.have.property('location');
                res.body.airports[0].location.should.have.property('latitude');
                res.body.airports[0].location.should.have.property('longitude');
                res.body.airports[0].should.have.property('currency_code');
                res.body.airports[0].should.have.property('timezone');
                res.body.airports[0].should.have.property('country');
                res.body.airports[0].country.should.have.property('code');
                res.body.airports[0].country.should.have.property('display_name');
                done();

            });
    });

    it('200.20. should list ALL aiports in a COUNTRY on /airports/BE /GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/BE')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(7);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('ANR');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Antwerp');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(false);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(51.183334);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(4.45);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Brussels');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('BE');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('Belgium');

                done();

            });
    });


    it('200.30. should list ONE aiports for country-code FR /airports/ CDG:  GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CDG');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Paris (Charles de Gaulle)');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(true);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(49);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(2.5333333);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Paris');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('FR');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('France');

                done();
            });
    });

    it('200.40. should return empty array when non-existant /country-code UK with airportcode /airports/ CDG:  GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/UK/airport-code/CDG')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.airport.should.eql([]);

                done();
            });
    });


    it('200.50. should list TWO aiports for country-code FR dom=false, int=true:  GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/FR?dom=false&int=true')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(2);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CDG');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Paris (Charles de Gaulle)');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(true);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(49);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(2.5333333);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Paris');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('FR');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('France');

                done();
            });
    });




});

describe('300. Should filter depending on whether airport is either domestic, internation - including both or neither', function () {

    it('300.10. should filter ONE airport for /airports/country-code:FR/airport-code/:CDG dom=false GET', function (done) {

        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG?dom=false')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CDG');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Paris (Charles de Gaulle)');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(true);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(49);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(2.5333333);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Paris');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('FR');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('France');

                done();
            });
    });

    it('300.20. should filter NO airport for /airports/country-code:FR/airport-code/:CDG int=false GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG?int=false')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.airport.should.eql([]);

                done();
            });
    });


    it('300.30. should filter NO airport for /airports/country-code:FR/airport-code/:CDG dom=true GET', function (done) {
        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG?dom=true')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.airport.should.eql([]);

                done();
            });
    });


    it('300.40. should filter ONE airport for /airports/country-code:FR/airport-code/:CDG int=true GET', function (done) {

        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG?int=true')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CDG');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Paris (Charles de Gaulle)');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(true);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(49);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(2.5333333);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Paris');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('FR');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('France');

                done();
            });
    });


    it('300.50. should filter ONE airport for /airports/country-code:FR/airport-code/:CDG int=true GET', function (done) {

        chai.request(server)
            .get('/airports/country-code/FR/airport-code/CDG?int=true')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CDG');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Paris (Charles de Gaulle)');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(true);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(49);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(2.5333333);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('EUR');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('Europe/Paris');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('FR');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('France');

                done();
            });
    });


    it('300.60. should filter ONE airport for multiple filters /airports/country-code:VE/airport-code/:CBS int=false dom=false GET', function (done) {

        chai.request(server)
            .get('/airports/country-code/VE/airport-code/CBS?dom=false&int=false')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CBS');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Cabimas');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(false);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(10.433333);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(-71.45);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('VEB');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('America/Caracas');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('VE');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('Venezuela');

                done();
            });
    });

    it('300.60. ignore badly formed filter argument /airports/country-code:VE/airport-code/:CBS int=false dom=BLAH GET', function (done) {

        chai.request(server)
            .get('/airports/country-code/VE/airport-code/CBS?dom=blah&int=false')
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('airport');
                res.body.airport.should.be.a('array');
                res.body.should.have.property('airport').with.lengthOf(1);

                res.body.airport[0].should.have.property('code');
                res.body.airport[0].code.should.equal('CBS');

                res.body.airport[0].should.have.property('display_name');
                res.body.airport[0].display_name.should.equal('Cabimas');

                res.body.airport[0].should.have.property('international_airport');
                res.body.airport[0].international_airport.should.equal(false);

                res.body.airport[0].should.have.property('regional_airport');
                res.body.airport[0].regional_airport.should.equal(false);

                res.body.airport[0].should.have.property('location');

                res.body.airport[0].location.should.have.property('latitude');
                res.body.airport[0].location.latitude.should.equal(10.433333);

                res.body.airport[0].location.should.have.property('longitude');
                res.body.airport[0].location.longitude.should.equal(-71.45);

                res.body.airport[0].should.have.property('currency_code');
                res.body.airport[0].currency_code.should.equal('VEB');

                res.body.airport[0].should.have.property('timezone');
                res.body.airport[0].timezone.should.equal('America/Caracas');

                res.body.airport[0].should.have.property('country');

                res.body.airport[0].country.should.have.property('code');
                res.body.airport[0].country.code.should.equal('VE');

                res.body.airport[0].country.should.have.property('display_name');
                res.body.airport[0].country.display_name.should.equal('Venezuela');

                done();
            });
    });


});