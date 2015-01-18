var opts = require("nomnom")
    .option('url', {
        abbr: 'u',
        help: 'Logitech Media Server url address. eg. http://192.168.0.10',
        required: true
    })
    .option('port', {
        abbr: 'p',
        help: 'Logitech Media Server port',
        default: 9000
    })
    .parse();

module.exports.opts = opts;
