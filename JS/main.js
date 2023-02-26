// Capturo los elementos que necesito para mi JS
let productosDiv = document.getElementById("productosDiv")
let btnDark = document.getElementById("btnDark")
let inputBuscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalCarrito = document.getElementById("modal-bodyCarrito")
let precioTotal = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")


// Array productos en Carrito

let productosCarrito = []

if (localStorage.getItem("Carrito")){ 
        for (let producto of JSON.parse(localStorage.getItem("Carrito"))){
        // capturo cantidad del storage
        let cantidadStorage = producto.cantidad
        // instancio productos
        let storageProd = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        // traigo la cantidad del storage
        storageProd.cantidad = cantidadStorage
        // pusheo el array
        productosCarrito.push(storageProd)
    }}else{

    productosCarrito = [], localStorage.setItem("Carrito", productosCarrito)
}
// Funciones

function verCatalogo(array){
    
    // reseteo
    productosDiv.innerHTML = ""
    
    for(let producto of array){
        //código para imprimir el array
        let nuevoProductodiv = document.createElement("div")
        nuevoProductodiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoProductodiv.innerHTML = `
        <div id="${producto.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="img/${producto.imagen}" alt="${producto.nombreProducto}">
            <div class="card-body">
                <h4 class="card-title">${producto.nombreProducto}</h4>
                <p class="">Precio: ${producto.precio}</p>
                <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Comprar</button>
            </div>
        </div> 
        `    
        productosDiv.appendChild(nuevoProductodiv)
        
        let agregarBtn = document.getElementById(`agregarBtn${producto.id}`)
        agregarBtn.onclick = ()=>{
            agregarCarrito(producto)

    }    
}
}

// Función para agregar nuevos productos

function agregarProducto(array){
    let nombreProducto = document.getElementById("productoInput")  
    let precioProducto = document.getElementById("precioInput")
    
    // Construyo el nuevo producto en base a los parámetros ingresados por el usuario
    const nuevoProducto = new Producto (array.length+1, nombreProducto.value, Number(precioProducto.value), "nuevoprod.jpg")
    
    // Agrego el nuevo producto al array de productos
    array.push(nuevoProducto)

    // Cargo el array en el Storage 
    localStorage.setItem("Productos", JSON.stringify(array))

    let formAgregarProducto = document.getElementById("formAgregarProducto")
    formAgregarProducto.reset()
}

// Función para buscar
function buscarProd(buscado, array){
    let busqueda = array.filter(
        (prod) => prod.nombreProducto.toLowerCase().includes(buscado.toLowerCase()))
        // Uso un ternario 
        busqueda.length == 0 ? 
        (coincidencia.innerHTML = `<h3>No tenemos ${buscado} en nuestro stock de productos</h3>`, verCatalogo(busqueda)) :
        (coincidencia.innerHTML = ``, verCatalogo(busqueda))
    
}

// Funciones para ordenar
// Por precio de mayor a menor
function precioMayorMenor(array){
    // Hago una copia del array
    let mayorMenor = [].concat(array)
    //Ordeno con método Sort
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)
}
// Por precio de menor a mayor
function precioMenorMayor(array){
    // Hago una copia del array
    let menorMayor = [].concat(array)
    //Ordeno con método Sort
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

// Alfabéticamente
function ordenAlfa(array){
    // Hago una copia del array
    let alfabetico = [].concat(array)
    //Ordeno con método Sort
    alfabetico.sort((a, b) => {
        if (a.nombreProducto > b.nombreProducto) {
        return 1
        }
        if (a.nombreProducto < b.nombreProducto) {
        return -1
        }
        return 0
    })
    verCatalogo(alfabetico)
}

// Función para agregar al carrito

function agregarCarrito(producto){
    
    // evaluamos si existe el producto
    let prodYaAgregado = productosCarrito.find((prod)=> prod.id == producto.id)

    if (prodYaAgregado == undefined){
        // pusheo productos al carrito
        productosCarrito.push(producto)
        // seteo en el storage
        localStorage.setItem("Carrito", JSON.stringify(productosCarrito))
        Swal.fire({
            title: `Producto agregado!`,
            text: `Agregaste 1 ${producto.nombreProducto} a tu Carrito de compras.`,
            icon: "success",
            confirmButtonText: "Entendido",
            confirmButtonColor: "green",
            timer: 3000,
            imageUrl: `img/${producto.imagen}`
        })

    }else{
        Swal.fire({
            title: `Atención!`,
            text: `El producto ${producto.nombreProducto} ya se encuentra agregado a tu Carrito.
            Ingresa en el Carrito para modificar la cantidad y finalizar tu compra.`,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",    
            timer: 3000
        })
}
}


// Función para agregar productos al carrito de compras
function cargarCarrito(array){
    modalCarrito.innerHTML = ""
    // Imprimo las cards
    array.forEach((prodCarrito)=>{
        
        modalCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productosCarrito${prodCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="img/${prodCarrito.imagen}" alt="${prodCarrito.nombreProducto}">
            <div class="card-body">
                    <h4 class="card-title">${prodCarrito.nombreProducto}</h4>
                    <p class="card-text">Precio unitario: $${prodCarrito.precio}</p> 
                    <p class="card-text">Total de unidades: ${prodCarrito.cantidad}</p>
                    <p class="card-text">Subtotal: $${prodCarrito.precio * prodCarrito.cantidad}</p>

                    <button class= "btn btn-success" id="botonSumarUnidad${prodCarrito.id}"><i class=""></i>+1</button>
                    <button class= "btn btn-danger" id="botonEliminarUnidad${prodCarrito.id}"><i class=""></i>-1</button> 

                    <button class= "btn btn-danger" id="botonEliminar${prodCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
        })
        // For Each para agregar functions
        array.forEach((prodCarrito)=>{
            // function para eliminar
            document.getElementById(`botonEliminar${prodCarrito.id}`).addEventListener("click", ()=>{
                // eliminar del DOM
                let cardProducto = document.getElementById(`productosCarrito${prodCarrito.id}`)
                cardProducto.remove()
                // elimnar del array
                let prodEliminar = array.find(prod => prod.id == prodCarrito.id)
                let posicion = array.indexOf(prodEliminar)
                array.splice(posicion, 1)
                // setear storage
                localStorage.setItem("Carrito", JSON.stringify(array))
                // recalcular el total
                compraTotal(array)
                        
            })
            // sumar unidad
            document.getElementById(`botonSumarUnidad${prodCarrito.id}`).addEventListener("click", ()=>{
                prodCarrito.sumarUnidad()
                localStorage.setItem("Carrito", JSON.stringify(array))
                cargarCarrito(array)
            }) 
            
            // restar unidad
            document.getElementById(`botonEliminarUnidad${prodCarrito.id}`).addEventListener("click", ()=>{
                let cantidad = prodCarrito.restarUnidad()
                // condicional para evitar que la cantidad baje de 1
                if (cantidad < 1){
                    let cardProducto = document.getElementById(`productosCarrito${prodCarrito.id}`)
                    cardProducto.remove()
                     // elimnar del array
                    let prodEliminar = array.find(prod => prod.id == prodCarrito.id)
                    let posicion = array.indexOf(prodEliminar)
                    array.splice(posicion, 1)
                    // setear storage
                    localStorage.setItem("Carrito", JSON.stringify(array))
                    // recalcular el total
                    compraTotal(array)
                }else{
                    localStorage.setItem("Carrito", JSON.stringify(array))
                }
                cargarCarrito(array)

            })

        })

        compraTotal(array)
    }
    

// Función para calcular la compra total

function compraTotal(array){
    let total = array.reduce((acc, productosCarrito)=> acc + (productosCarrito.precio * productosCarrito.cantidad), 0)
    total == 0 ?
    precioTotal.innerHTML = `No hay productos agregados en tu Carrito` : 
    precioTotal.innerHTML = `El precio total es $ ${total}`
    return total
} 

// Función que finaliza el proceso de compra

function finalizarCompra(array){
    Swal.fire({
        title: `Desea finalizar su compra?`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro!",
        confirmButtonColor: "green",
        cancelButtonText: "No!!!",
        cancelButtonColor: "orange",
    }).then( (result) =>{
        if(result.isConfirmed){
            let totalFinal = compraTotal(array)
            Swal.fire({
                title: "Compra finalizada",
                icon: "succes",
                confirmButtonColor: "green",
                text: `Muchas gracias por su compra. Usted ha gastado $ ${totalFinal}`
            })
            productosCarrito = []
            localStorage.removeItem("Carrito")
        }else{
            Swal.fire({
                title: "Compra cancelada",
                icon: "warning",
                confirmButtonColor: "red",
                text: "Su compra fue anulada. Sus productos siguen en el Carrito",
                timer: 3000,
            })
        }
    })
}

// Eventos

guardarProductoBtn.addEventListener("click", ()=>{
    agregarProducto(listaProductos)
    verCatalogo(listaProductos)
    
})

// Evento Buscador 
inputBuscador.addEventListener("input", ()=> {
    buscarProd(inputBuscador.value, listaProductos)  
})

// Evento ordenar productos

selectOrden.addEventListener("change", ()=>{
    if(selectOrden.value == "1"){
        precioMayorMenor(listaProductos)
    }else if (selectOrden.value == "2"){
        precioMenorMayor(listaProductos)
    }else if(selectOrden.value == "3"){
        ordenAlfa(listaProductos)
    }
})

botonCarrito.addEventListener("click", ()=> {
    cargarCarrito(productosCarrito)
})

botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarCompra(productosCarrito)
})


// Código
// Loader
setTimeout(()=>{
    loaderTexto.innerText = ""
    loader.remove()
    verCatalogo(listaProductos)
}, 2000)

