// Defino mi clase de productos
class Producto{
    constructor (id, nombreProducto, precio, imagen) {
        this.id = id,
        this.nombreProducto = nombreProducto,
        this.precio = precio,
        this.imagen = imagen,
        this.cantidad = 1
    }
    
    // Métodos
    sumarUnidad(){
        this.cantidad += 1
    }
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}


// Creo el array de Productos 
let listaProductos = []

// Uso función asincrónica y trabajo con el localStorage
const cargarLista = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()
    // Instancio los productos
    for (let producto of data){
        let nuevoProducto = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        listaProductos.push(nuevoProducto)
    }
    // Seteo el localStorage
    localStorage.setItem("Productos", JSON.stringify(listaProductos))
}

if(localStorage.getItem("Productos")){
    for (let producto of JSON.parse(localStorage.getItem("Productos"))){
        let storageProd = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        listaProductos.push(storageProd)
    }
}else{
    cargarLista()
}


