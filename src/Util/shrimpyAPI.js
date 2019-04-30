const axios = require("axios");
const crypto = require("crypto");

testEndpoint();
function testEndpoint() {
  const reqAuth = encodeRequest();
  console.log(reqAuth);
  axios
    .get(`https://dev-api.shrimpy.io/v1/exchanges/${reqAuth}`)
    .then(data => {
      console.log("SUCCESS:", JSON.stringify(data));
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}

function encodeRequest(options = {}) {
  const secret =
    "355fae68ad3304728a6a352ba5a928b319f33472da347807c513bb260983b83b36fd1ba9276ac1f79c324bda3e0d8388886b2d55ba34fcd7171331a7788d03cb";

  const nonce = Date.now();
  const requestPath =
    options.requestPath ||
    "/v1/users/70e3a52a-4fda-464d-b4af-029f55cbd9be/accounts/123/rebalance_period";
  const bodyJSON = options.body || { rebalancePeriod: 24 };

  const body = JSON.stringify(bodyJSON);

  const method = options.method || "POST";

  // create the prehash string by concatenating required parts
  const prehashString = requestPath + method + nonce + body;

  // decode the base64 secret
  const key = Buffer.from(secret, "base64");

  // create a sha256 hmac with the secret
  const hmac = crypto.createHmac("sha256", key);

  // hash the prehash string and base64 encode the result
  const result = hmac.update(prehashString).digest("base64");
  return result;
}
