const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  try {
    const { id, area } = JSON.parse(event.body || "{}");
    if (!id || !area) {
      return { statusCode: 400, body: JSON.stringify({ error: "Faltan datos" }) };
    }

    const store = getStore("recursos");
    await store.delete(id);

    let indice = (await store.get("indice:" + area, { type: "json" })) || [];
    indice = indice.filter((r) => r.id !== id);
    await store.setJSON("indice:" + area, indice);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "No se pudo eliminar" }) };
  }
};
