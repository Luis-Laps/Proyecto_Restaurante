const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img')
const btnTodos = document.querySelector('.todos')
const btnEnsalada = document.querySelector('.ensaladas')
const btnPasta = document.querySelector('.pastas')
const btnPizza = document.querySelector('.pizzas')
const btnPostre = document.querySelector('.postres')
const contenedorPlatillo = document.querySelector('.platillos')

document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    platillos()
})

const eventos = () => menu.addEventListener('click', abrirMenu);

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla_completa');
    const body = document.querySelector('body');
        if(document.querySelectorAll('.pantalla_completa').length > 0)return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn_cerrar');

    navegacion.appendChild(btnCerrar)
    cerrarMenu(btnCerrar,overlay)
}


const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);

        }
    })
})

imagenes.forEach(imagen=>{
    observer.observe(imagen)
})


const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar')
        overlay.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar')
        boton.remove()
    }
}

const platillos = () =>{
    let platillosArreglo = []
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);

    const ensaladas = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo') ==='ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') ==='pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') ==='pizza');
    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') ==='postres');

    mostrarPlatiilos(ensaladas, pastas, pizzas, postres, platillosArreglo)

}

const mostrarPlatiilos = (ensaladas, pastas, pizzas, postres, todos) => {
    btnEnsalada.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillo)
        ensaladas.forEach(ensalada=> contenedorPlatillo.appendChild(ensalada))
    })
    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillo)
        pastas.forEach(pasta=> contenedorPlatillo.appendChild(pasta))
    })
    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillo)
        pizzas.forEach(pizza=> contenedorPlatillo.appendChild(pizza))
    })
    btnPostre.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillo)
        postres.forEach(postre=> contenedorPlatillo.appendChild(postre))
    })
    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillo)
        todos.forEach(todo=> contenedorPlatillo.appendChild(todo))
    })
    
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}