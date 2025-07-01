const toggle = document.getElementById("theme-toggle");
const background = document.getElementById("background");

// Imágenes para modo claro
const imagesLight = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
];

// Imágenes para modo oscuro
const imagesDark = [
  "https://images.unsplash.com/photo-1639747281100-04650e82f80d?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1614852209114-52bd364d0466?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1500&q=80",
];

function updateBackgroundByScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const segment = docHeight / imagesLight.length;

  let index = Math.floor(scrollTop / segment);
  if(index >= imagesLight.length) index = imagesLight.length -1;

  const isDark = document.body.classList.contains("dark");
  const images = isDark ? imagesDark : imagesLight;

  if(background.dataset.current !== String(index)) {
    background.style.backgroundImage = `url(${images[index]})`;
    background.dataset.current = String(index);
  }
}

// Manejar toggle modo oscuro/claro
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("modo", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("modo", "light");
  }
  // Cambiar fondo al cambiar modo y resetear índice
  updateBackgroundByScroll();
});

// Cargar modo guardado y fondo inicial
const savedMode = localStorage.getItem("modo");
if (savedMode === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
} else {
  document.body.classList.remove("dark");
  toggle.checked = false;
}

updateBackgroundByScroll();
window.addEventListener("scroll", updateBackgroundByScroll);








// Contador de comentarios simulados usando localStorage
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const contadorTexto = document.getElementById("contador-comentarios");

  // Obtener el contador guardado, o iniciar en 0
  let contador = parseInt(localStorage.getItem("contadorComentarios")) || 0;
  actualizarContador();

  form.addEventListener("submit", function () {
    contador++;
    localStorage.setItem("contadorComentarios", contador);
    actualizarContador();
  });

  function actualizarContador() {
    contadorTexto.textContent = `Comentarios registrados: ${contador}`;
  }
});
