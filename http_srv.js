const http = require('http');
const hostname = '127.0.0.1';
const port = 6067;

var fs = require('fs');

var request = require("request");
var terminal = require("web-terminal");
var dns = require('dns');

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        fs.readFile("./index.html", "UTF-8", function(err, html){
            console.log('##Request html file');
            if (err) {
                throw err; 
             }
            
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }else if(req.url.match("\.css$")){
        fs.readFile("./style.css", "UTF-8", function(err, css){
            console.log('##Request css file');
            if (err) {
                throw err; 
             }

            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css);
            res.end();
        });
    }else if(req.url.match("\.js$")){
        fs.readFile("./map.js", "UTF-8", function(err, js_file){
            console.log('##Request js file');
            if (err) {
                throw err; 
             }
            
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(js_file);
            res.end();
        });
    }else if(req.url.match("ipinfo.io")){
        var urlGetJSON = (req.url).substr(1);
        var jsonObject;
        console.log('##GET: ' + urlGetJSON);

        request(urlGetJSON, function (error, response, body) { 
            if (!error && response.statusCode === 200) {
                jsonObject = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(jsonObject));
                res.end();
            }
        });
    }else if(req.url.match("dns")){
        var getDomainIP = (req.url).substr(5);
        console.log('##GET IP OF: ' + getDomainIP);
        var w3 = dns.lookup(getDomainIP, function (err, addresses, family) {
            console.log('###: ' + addresses);

            var json_d = {
                ip_addr: '' + addresses
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(json_d));
            res.end();
        });
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("No Page Found");
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`**********************************************`);
    console.log('Tool: LocateMe ; Server: Node.js\n');
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`**********************************************`);
    console.log(`
___    __   ___ _                           
|   \\\ __\\\ \\\ / (_) |  ___ ___ _ ___ _____ _ _ 
| |) / -_) V /| | | (_-</ -_) '_\\\ V / -_) '_|
|___/\\\___|\\\_/ |_|_| /__/\\\___|_|  \\\_/\\\___|_|  
                                                                                            
    `);
    console.log(`*********************************************`);
});

terminal(server);