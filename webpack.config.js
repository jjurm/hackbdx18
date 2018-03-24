var path = require('path');

module.exports = {
    entry: "./src/client/client.js",
    output: {
        path : path.join(__dirname, './src/'),
        filename: "bundle.js"
    }
};
