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
    const { area, titulo, grado, descripcion, autor, html } = datos;

    if (!area || !titulo || !html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan datos obligatorios (área, título o archivo)" })
      };
    }

    const store = recursosStore();
    const id = idAleatorio();

    const registro = {
      id,
      area,
      titulo,
      grado: grado || "",
      descripcion: descripcion || "",
      autor: autor || "",
      html,
      fecha: new Date().toISOString()
    };

    await store.setJSON(id, registro);

    // Actualizar el índice del área para poder listar los recursos luego sin recorrer todo
    let indice = [];
    try {
      const actual = await store.get("indice:" + area, { type: "json" });
      indice = actual || [];
    } catch (e) {
      indice = [];
    }

    indice.unshift({
      id,
      titulo,
      grado: grado || "",
      descripcion: descripcion || "",
      autor: autor || "",
      fecha: registro.fecha
    });

    await store.setJSON("indice:" + area, indice);

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
