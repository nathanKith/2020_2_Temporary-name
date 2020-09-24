const fs = require("fs")
const http = require("http")

const server = http.createServer((req, res) => {
    const path = `./public${req.url === '/' ? '/index.html' : req.url}`

    fs.readFile(path, (err, file) => {
        if (err) {
            console.log('file read error', path, err);
            res.write('error');
            res.end();

            return;
        }

        console.log('file read', path);

        res.write(file);
        res.end();
    });
})

const port = 3000

server.listen(port, (err) => {
    if (err) {
        console.log("cannot listen: ", err);
    }
});