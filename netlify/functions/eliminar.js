const { recursosStore } = require("./_lib");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  try {
    const { id } = JSON.parse(event.body || "{}");
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: "Falta el id" }) };
    }

    const store = recursosStore();
    await store.delete(id);

    let indice = (await store.get("indice", { type: "json" })) || [];
    indice = indice.filter((r) => r.id !== id);
    await store.setJSON("indice", indice);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "No se pudo eliminar" }) };
  }
};
