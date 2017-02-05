# airport
list airports in country and name, filter by domestic or international - example using node
invokes qantas api for airport resources

Interesting aspects of this node.js source include:

Uses ES6 with request-promise-native for HTTP REST requests
Logging with Winston and Morgan 
Unit test framwork - Mocha & Chai ./test/test-airline   - examples deal with asynch requests
Swagger REST API documentation ./airport.yaml - load up in http://editor.swagger.io/ to view

Execution:
npm start

Automated Testing:
mocha --timeout=20000    - to deal with asynch requests to backend service that may be a while returning


