//1. import http modul
const http = require('http');
const path = require('path');
const fs = require('fs')

//2. create a server
const serveStaticFile = (request, response) => {
    //3.1 parse URL and detemain filename
    //3.2 if no 'path' is define, return 'index.html'
    const url = request.url === '/' ? 'index.html' : request.url;
    console.log(__dirname);
    const filePath = path.join(__dirname, "../public", url);
    const fileExt = path.extname(filePath);
    console.log(`filePath: ${filePath}`);
    let contentType;
    switch (fileExt) {
        case ".jfif":
            contentType = "image/jfif";
            break;
        case ".css":
            contentType = "text/css";
            break;
        default:
            contentType = "text/html";

    }
    console.log('contentTypy:', contentType);

    //3.3 ELSE look for the desired file
    fs.readFile(filePath, (error, content) => {
        // 1. check for erors, if error exists return 404.html
        if (error != null) {
            if (error.code === 'ENOENT') {
                const errorfile = path.join(__dirname, "public", "404.html")
                fs.readFile(errorfile, (err, data) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(data, 'utf8');
                }
                )
            }
            else {
                response.writeHead(500);
                response.end(`Server error : ${error.code}`);
            }

        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');
        }
      
    });
    
}

module.exports = { serveStaticFile};




