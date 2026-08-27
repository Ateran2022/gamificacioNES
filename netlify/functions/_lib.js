const { getStore } = require("@netlify/blobs");

function recursosStore() {
  return getStore({
    name: "recursos",
    siteID: process.env.BLOBS_SITE_ID,
    token: process.env.BLOBS_TOKEN
  });
}

module.exports = { recursosStore };
