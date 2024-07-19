// script.js
document.addEventListener('DOMContentLoaded', () => {
  const modoDisco = document.querySelector("#disco");
  const body = document.body;
  const imageContainer = document.getElementById('image-container');

  modoDisco.addEventListener("click", () => {
      cambiarColor();
      agregarImagen();
  });

  function cambiarColor() {
      body.classList.toggle("modo-disco");
  }

  function agregarImagen() {
      if (!imageContainer.querySelector('img')) { 
          const img = document.createElement('img');
          img.src = ''; 
          img.alt = 'Imagen de prueba';
          img.classList.add('img-fluid');
          imageContainer.appendChild(img);
      }
  }

  const productos = [
      { id: 1, nombre: "cerveza", precio: 2000, imagen: "images/cerveza.jpeg" },
      { id: 2, nombre: "vodka", precio: 5000, imagen: "images/vodka.jpg" },
      { id: 3, nombre: "whisky", precio: 7000, imagen: "images/whisky.png" },
      { id: 4, nombre: "gin", precio: 4000, imagen: "images/gin.jpg" },
      { id: 5, nombre: "pisco", precio: 6000, imagen: "images/pisco.jpg" },
      { id: 6, nombre: "Vino", precio: 3000, imagen: "images/vino.jpg" }
  ];

  let contadorCarrito = 0;
  let carrito = [];

  const productoCatalogoHTML = (producto) => {
      return `
          <div class="col">
              <div class="card">
                  <img src="${producto.imagen}" class="card-img-top" />
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">Precio: ${producto.precio}</p>
                      <button id="btn-catalogo-${producto.id}" class="btn btn-success">Agregar</button>
                  </div>
              </div>
          </div>`;
  };

  const productoCarritoHTML = (producto) => {
      return `
          <div class="col">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <button id="btn-carrito-${producto.idCompra}" class="btn btn-danger">Quitar</button>
                  </div>
              </div>
          </div>`;
  };

  const mostrarCatalogo = () => {
      const catalogoNodo = document.getElementById("catalogo");
      let catalogoHTML = "";

      for (const producto of productos) {
          catalogoHTML += productoCatalogoHTML(producto);
      }

      catalogoNodo.innerHTML = catalogoHTML;
      botonesCatalogo();
  };

  const mostrarCarrito = () => {
      const carritoNodo = document.getElementById("carrito");
      const precioNodo = document.getElementById("precioTotal");

      let carritoHTML = "";
      let precio = 0;
      for (const producto of carrito) {
          carritoHTML += productoCarritoHTML(producto);
          precio += producto.precio;
      }

      precioNodo.innerHTML = precio;
      carritoNodo.innerHTML = carritoHTML;
      botonesCarrito();
      guardarCarritoEnLocalStorage();
  };

  const botonesCatalogo = () => {
      for (const producto of productos) {
          const botonId = `btn-catalogo-${producto.id}`;
          const botonNodo = document.getElementById(botonId);

          botonNodo.addEventListener("click", () => {
              const productoCarrito = {
                  nombre: producto.nombre,
                  idCompra: contadorCarrito,
                  precio: producto.precio,
              };

              contadorCarrito += 1;
              carrito.push(productoCarrito);
              mostrarCarrito();
          });
      }
  };

  const botonesCarrito = () => {
      for (const producto of carrito) {
          const botonId = `btn-carrito-${producto.idCompra}`;
          const botonNodo = document.getElementById(botonId);

          botonNodo.addEventListener("click", () => {
              const index = carrito.findIndex((p) => p.idCompra == producto.idCompra);
              carrito.splice(index, 1);
              mostrarCarrito();
          });
      }
  };

  const guardarCarritoEnLocalStorage = () => {
      localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  const cargarCarritoDeLocalStorage = () => {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
          carrito = JSON.parse(carritoGuardado);
          contadorCarrito = carrito.length ? carrito[carrito.length - 1].idCompra + 1 : 0;
          mostrarCarrito();
      }
  };

  mostrarCatalogo();
  cargarCarritoDeLocalStorage();
});
