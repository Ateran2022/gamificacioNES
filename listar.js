const { recursosStore } = require("./_lib");

exports.handler = async function () {
  try {
    const store = recursosStore();
    const indice = (await store.get("indice", { type: "json" })) || [];

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
