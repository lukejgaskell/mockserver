
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

module.exports = (config = {}) => {
    const port = config.port || 3000;
    const mockFolder = endNoSlash(config.mockFolder) || "./mock_data";
    const apiPath = endInSlash(config.apiPath) || "/api/";
    const distFolder = config.distFolder || "./dist";

    app.use(express.static(distFolder));

    app.all(apiPath + "*", (req, res) => {
        const file = mockFolder + req.path.slice(apiPath.length - 1) + "." + req.method.toLowerCase() + ".json";
        
        if (!fs.existsSync(file)) return res.sendStatus(404);
    
        const data = JSON.parse(fs.readFileSync(file).toString());
        
        if (data instanceof Array) return res.json(data);
        if (!data.status && !data.body && !data.headers) return res.json(data);
        
        res.set(data.headers || {});
        res.status(data.status || 200);
        res.json(data.body);
    });

    function endInSlash(value) {
        if (!value || value.slice(-1) === "/") return value;
        return value + "/";
    }

    function endNoSlash(value) {
        if (!value || value.slice(-1) !== "/") return value;
        return value.slice(0, -1);
    }
    
    app.listen(port, (error) => {
        console.log('mockserver listening on port: ' + port);
    });
}