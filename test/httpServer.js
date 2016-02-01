//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8010; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	if (request.method === 'OPTIONS') {
	    // add needed headers
	    var headers = {};
	    headers["Access-Control-Allow-Origin"] = "*";
	    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	    headers["Access-Control-Allow-Credentials"] = true;
	    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	    headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
	    // respond to the request
	    response.writeHead(200, headers);
	    response.end();
  	} else if (request.method == 'POST') {
	  console.log("[200] " + request.method + " to " + request.url);
	    
	  var body_data;
	  request.on('data', function(chunk) {
	    console.log("Received body data:");
	    console.log(chunk.toString());
	    body_data = chunk.toString();
	  });
	  
	  request.on('end', function() {
	    // empty 200 OK response for now
	    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
	    response.end(body_data);
	  });
	  
	} else {
	  console.log("[405] " + request.method + " to " + request.url);
	  response.writeHead(405, "Get method not supported", {'Content-Type': 'text/html'});
	  response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Get method not supported.</h1></body></html>');
	}
};

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
