// Defino mi clase de productos
class Producto{
    constructor (id, nombreProducto, precio, imagen) {
        this.id = id,
        this.nombreProducto = nombreProducto,
        this.precio = precio,
        this.imagen = imagen
    }
}

// Creo el array de Productos y trabajo con el localStorage
let listaProductos = []

const cargarLista = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    for (let producto of data){
        let nuevoProducto = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        listaProductos.push(nuevoProducto)
    }
    localStorage.setItem("Productos", JSON.stringify(listaProductos))
}

if(localStorage.getItem("Productos")){
    // listaProductos = JSON.parse(localStorage.getItem("Productos"))
    for (let producto of JSON.parse(localStorage.getItem("Productos"))){
        let storageProd = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        listaProductos.push(storageProd)
    }
}else{
    cargarLista()
}


