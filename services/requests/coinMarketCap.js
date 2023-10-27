const https = require("https");
const getCryptoCurrency = async () => {
  const options = {
    hostname: "sandbox-api.coinmarketcap.com",
    path: "/v1/cryptocurrency/listings/latest",
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
    },
  };

  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 200) {
        const json = JSON.parse(data);
        console.log(json);
      } else {
        console.error(`Request failed with status code ${res.statusCode}`);
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
module.exports = getCryptoCurrency;
