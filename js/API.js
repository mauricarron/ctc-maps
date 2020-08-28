class API {
  async obtenerDatos() {
    const total = 1000;
    const requestDatos = await fetch(
      `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`
    );
    const datos = await requestDatos.json();
    return datos;
  }
}
