const moment = require("moment");
const axios = require("axios");

// timestamps from cryptoCompare are supplied in seconds, not ms, so multiply by 1000 before creating a date.

const time = new Date(1555977600 * 1000);

moment(time).format("MM/DD/YYYY");
console.log(time);
