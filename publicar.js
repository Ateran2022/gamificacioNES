const { recursosStore } = require("./_lib");

function idAleatorio() {
  return Math.random().toString(36).slice(2, 9);
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  try {
    const datos = JSON.parse(event.body || "{}");
    const { titulo, usuario, html } = datos;

    if (!titulo || !html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos obligatorios (título o archivo)" })
      };
    }

    const store = recursosStore();
    const id = idAleatorio();

    const registro = {
      id,
      titulo,
      usuario: usuario || "",
      html,
      fecha: new Date().toISOString()
    };

    await store.setJSON(id, registro);

    let indice = [];
    try {
      const actual = await store.get("indice", { type: "json" });
      indice = actual || [];
    } catch (e) {
      indice = [];
    }

    indice.unshift({
      id,
      titulo,
      usuario: usuario || "",
      fecha: registro.fecha
    });

    await store.setJSON("indice", indice);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url: "/r/" + id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo guardar el recurso", detalle: String(err) })
    };
  }
};
