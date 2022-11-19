const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer= document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

obtenerDolar();

document.addEventListener('DOMContentLoaded', () => { 
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
cards.addEventListener("click", e => {
    addCarrito(e)
})
items.addEventListener("click", e => {
    btnAccion(e)
})
const fetchData = async () => {
    try {
        const res = await fetch("api.json");
        const data = await res.json()
        //console.log(data)
        pintarCard(data)
    } catch (error) {
        console.log(error)
        
    }
}

const pintarCard = data => {
    //console.log(data)
    data.forEach(producto => {
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains("btn-dark"))
    if (e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado al carrito',
            color: "#121213d8",
            showConfirmButton: false,
            timer: 1500
        })
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.title
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio 
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}
const pintarFooter = () => {
    footer.innerHTML = ""
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío!! Agrega lo que quieras comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad ,0 )
    const nPrecio = Object.values(carrito).reduce ((acc, { cantidad,precio }) => acc + cantidad * precio,0 )   

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById("finalizar")
    btnVaciar.addEventListener("click", () => {
        carrito = {}
        pintarCarrito()
        Toastify({
            text: "Orden de compra en proceso!",
            duration: 3000,
            gravity: "bottom",
            position: "left",
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }
        }).showToast();
    })
    
}

const btnAccion = e => {
    //console.log(e.target)
    // accion de aumentar 
    if(e.target.classList.contains("btn-info")) {
        //console.log(carrito[e.target.dataset.id])
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if(e.target.classList.contains('btn-danger')) {
        //accion disminuir
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

//Obtener valor dolar
function obtenerDolar(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest"
    fetch(URLDOLAR)
        .then( respuesta => respuesta.json())
        .then( cotizaciones =>{
            const dolarBlue = cotizaciones.blue;
            console.log(dolarBlue);
            document.getElementById("fila_prueba").innerHTML+=`
                <p>Dolar compra: $ ${dolarBlue.value_buy} Dolar venta: $ ${dolarBlue.value_sell}</p>
                `;
                dolarCompra=dolarBlue.value_buy;
                obtenerJSON();
        })
}

//GETJSON de producto.json
async function obtenerJSON() {
    const URLJSON="api.json";
    const resp = await fetch(URLJSON)
    const data = await resp.json();
    carritoJSON = data;

}

