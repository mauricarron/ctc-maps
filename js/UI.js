class UI {
  constructor() {
    this.mapa = this.inicializarMapa();
    this.api = new API();
    this.markers = new L.layerGroup();
  }

  inicializarMapa() {
    const map = L.map("mapa").setView([19.390519, -99.3739778], 6);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + enlaceMapa + " Contributors",
      maxZoom: 18,
    }).addTo(map);
    return map;
  }

  mostrarEstablecimientos() {
    this.api.obtenerDatos().then((response) => {
      const responseDatos = response.results;
      this.mostrarPines(responseDatos);
    });
  }

  mostrarPines(datos) {
    this.markers.clearLayers();
    datos.forEach((dato) => {
      const { latitude, longitude, calle, regular, premium } = dato;
      const opcionesPopup = L.popup().setContent(`
          <p><b>${calle}</b></p>
          <p><i>Regular</i>: <b>$${regular}</b></p>
          <p><i>Premium</i>: <b>$${premium}</b></p>
        `);
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude),
      ]).bindPopup(opcionesPopup);
      this.markers.addLayer(marker);
    });
    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(busqueda) {
    this.api.obtenerDatos().then((datos) => {
      const resultados = datos.results;
      this.filtrarSugerencias(resultados, busqueda);
    });
  }

  filtrarSugerencias(resultado, busqueda) {
    const filtro = resultado.filter(
      (filtro) => filtro.calle.indexOf(busqueda) !== -1
    );
    this.mostrarPines(filtro);
  }
}
