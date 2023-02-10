// Defino mi clase de productos
class Producto{
    constructor (id, nombreProducto, precio, imagen) {
        this.id = id,
        this.nombreProducto = nombreProducto,
        this.precio = precio
        this.imagen = imagen
    }
}

// Instancio los primeros objetos de Producto
const karategi = new Producto(1, "Karategi", 8400, "karategi.jpg")
const guantines = new Producto(2, "Guantines", 3400, "guantines.jpg")
const empeinera = new Producto(3, "Empeinera", 4400, "empeinera.jpg")
const tobillera = new Producto(4, "Tobillera", 6400, "tobillera.jpg")


// Creo el array de Productos y trabajo con el localStorage
let listaProductos = []
if(localStorage.getItem("Productos")){
    // listaProductos = JSON.parse(localStorage.getItem("Productos"))
    for (let producto of JSON.parse(localStorage.getItem("Productos"))){
        let storageProd = new Producto (producto.id, producto.nombreProducto, producto.precio, producto.imagen)
        listaProductos.push(storageProd)
    }
}else{
    listaProductos.push(karategi, guantines, empeinera, tobillera)
    localStorage.setItem("Productos", JSON.stringify(listaProductos))
}


