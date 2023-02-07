class zapatilla{
    constructor(id,marca,modelo,precio,img,stock){

        this.id=id;
        this.marca=marca;
        this.modelo=modelo;
        this.precio=precio;
        this.img=img;
        this.stock=stock;
    }

}

class Carrito{
    constructor(){

        this.carrito=[];
    }

    GetCarrito(){
        return this.carrito;
    }

    AddProducto(zapatilla){

        this.carrito.push({...zapatilla,cantidad:1});
    }

    RemoveProducto(prenda){

        let index;
        switch (prenda) {
            case 1:
                index=this.carrito.indexOf(pantalon);
                break;
            case 2:
                index=this.carrito.indexOf(remera);
                break;
            case 3:
                index=this.carrito.indexOf(zapatilla);
                break;
        }
        
        if (index!=-1 && index!=null) {
            listaCompra.splice(index,1);
        }
    }

    RemoverItem(posicion){
        this.carrito.splice(posicion,1);
    }
    
    LimpiarCarrito(){

        this.carrito.splice(0, this.carrito.length);
        
        limpiarModal();
        localStorage.removeItem("carrito");
    }

   //suma
    Subtotal(){
        let aux=this.carrito.reduce((acumulador, x)=>acumulador+(x.precio*x.cantidad),0);
        return aux;
    }

}

const cargarProductos= async ()=>{

    const response = await fetch("./productos.json");
    let data= await response.json();
    
    data.forEach((element)=>{
        let allcards=document.getElementById("allcards");
        
        allcards.innerHTML+=    `<div class="card col-lg-4 col-12">
                                <h2>${element.marca} ${element.modelo}</h2>         
                                <img class="card-img" src="img/${element.img}" alt="zapatilla">
                                <p class="p-size">$${element.precio}</p>
                                <button id="btn-zapatilla${element.id}" class="btn">Agregar</button>
                            </div>`;
    
    })

    data.forEach((element)=>{
        document.getElementById(`btn-zapatilla${element.id}`)?.addEventListener("click",()=>{

            if (listaCompra.GetCarrito().find(zapatilla=>zapatilla.id===element.id)) {
        
                let index=listaCompra.GetCarrito().findIndex(zapatilla=>zapatilla.id===element.id);

                if (listaCompra.GetCarrito()[index].cantidad<element.stock) {
                    listaCompra.GetCarrito()[index].cantidad++;
                }else{
                    Swal.fire({
                        position: 'top',
                        title: 'Sin stock',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else{
                let producto = new zapatilla(element.id,element.marca,element.modelo,element.precio,element.img,element.stock)
                listaCompra.AddProducto(producto);
            }
           
            cargarStorage("carrito",JSON.stringify(listaCompra.GetCarrito()));
            contItem();
        })
    })   
}






const cargarStorage=(clave,valor)=>{
    localStorage.setItem(clave,valor);
}


const obtenerStorage=()=>{

    if (localStorage.getItem("carrito")!==null) {
    
        let listAux=JSON.parse(localStorage.getItem("carrito"));
        listAux.forEach((ele)=>{
            listaCompra.GetCarrito().push(ele);
        })
    }
    contItem();

}


cargarStorage("location",window.location.href);


// //Función que detecta el cambio de tamaño de la pantalla
// window.addEventListener("resize", function(){
//     if(window.innerWidth < 800){
//         document.querySelector(".menu-button").style.display = "block";
//     }else{
//         document.querySelector(".menu-button").style.display = "none";
//     }
// });

// //Función que muestra u oculta el navbar al hacer clic en el botón del menú desplegable
// document.querySelector(".menu-button").addEventListener("click", function(){
//     document.querySelector(".navbar").classList.toggle("hidden");
// });