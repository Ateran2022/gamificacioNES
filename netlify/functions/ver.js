const { recursosStore } = require("./_lib");

exports.handler = async function (event) {
  var id = event.queryStringParameters && event.queryStringParameters.id;

  if (!id) {
    // Respaldo: tomar el id directamente del final de la URL (ej: /.netlify/functions/ver/59ioj1b)
    var partes = event.path.split("/").filter(Boolean);
    id = partes[partes.length - 1];
    if (id === "ver") id = null;
  }

  if (!id) {
    return { statusCode: 400, body: "Falta el identificador del recurso." };
  }

  try {
    const store = recursosStore();
    const registro = await store.get(id, { type: "json" });

    if (!registro) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1 style='font-family:sans-serif;text-align:center;margin-top:80px;'>Este recurso ya no está disponible.</h1>"
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: registro.html
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: "<h1 style='font-family:sans-serif;text-align:center;margin-top:80px;'>Ocurrió un error al cargar el recurso.</h1>"
    };
  }
};
