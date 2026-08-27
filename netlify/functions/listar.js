const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  const area = event.queryStringParameters && event.queryStringParameters.area;

  if (!area) {
    return { statusCode: 400, body: JSON.stringify({ error: "Falta el área" }) };
  }

  try {
    const store = getStore("recursos");
    const indice = (await store.get("indice:" + area, { type: "json" })) || [];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(indice)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    };
  }
};
