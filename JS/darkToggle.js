// Dark Mode
if(localStorage.getItem("modoOscuro")){
    if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnDark.innerText = `Light`
        btnDark.className = `btn btn-light`
        document.body.classList.add("darkMode")
    }
}else{
    localStorage.setItem("modoOscuro", false)
}

btnDark.addEventListener("click", ()=> {
    document.body.classList.toggle("darkMode")

    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnDark.innerText = `Light`
        btnDark.className = `btn btn-light`
        localStorage.setItem("modoOscuro", true)
    }else{
        btnDark.innerText = `Dark`
        btnDark.className = `btn btn-dark`
        localStorage.setItem("modoOscuro", false)
    }
})