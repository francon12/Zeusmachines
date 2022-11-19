window.addEventListener('load', ()=> {
    const form = document.querySelector("#frm-formu");
        const nombre = document.getElementById("nombre");
        const email = document.getElementById("email");
        const dni = document.getElementById("txt-dni");
        const localidad = document.getElementById("txt-loca");
        const direccion = document.getElementById("txt-dire");
        const tarjeta = document.getElementById("inputNumero");
        const vencimientoMes = document.getElementById("selectMes");
        const vencimientoAno = document.getElementById("selectYear");
        const codigo = document.getElementById("inputCCV");
        const templateFooter = document.getElementById("template-footer").content

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validaCampos()
    })
    
    const validaCampos = ()=> {
        //capturar los valores ingresados por el usuario
        const nombreValor = nombre.value.trim()
        const emailValor = email.value.trim()
        const dniValor = dni.value.trim()
        const localidadValor = localidad.value.trim();
        const direccionValor = direccion.value.trim();
        const tarjetaValor = tarjeta.value.trim();
        const vencimientoMesValor = vencimientoMes.value.trim();
        const vencimientoAnoValor = vencimientoAno.value.trim();
        const codigoValor = codigo.value.trim();

        //validando campo usuario
        //(!usuarioValor) ? console.log('CAMPO VACIO') : console.log(usuarioValor)
        if(!nombreValor){
            //console.log('CAMPO VACIO')
            validaFalla(nombre, 'Campo vacío')
        }else{
            validaOk(nombre)
        }

        //validando campo email
        if(!emailValor){
            validaFalla(email, 'Campo vacío')            
        }else if(!validaEmail(emailValor)) {
            validaFalla(email, 'El e-mail no es válido')
        }else {
            validaOk(email)
        }
         //validando campo dni

        if(!dniValor){
            validaFalla(dni, 'Campo vacío')
        }else if(!validaDni(dniValor)) {
            validaFalla(dni, 'El dni no es válido')
        }else{
            validaOk(dni)
        }

        //validando campo localidad
        if(!localidadValor){
            validaFalla(localidad, 'Campo vacío')
        }else{
            validaOk(localidad)
        }

        // validando campo de direccion
        if(!direccionValor){
            validaFalla(direccion, 'Campo vacío')
        }else{
            validaOk(direccion)
        }

        // validando campo tarjeta
        if(!tarjetaValor){
            validaFalla(tarjeta, 'Campo vacío')
        }else if(!validaTarjeta(tarjetaValor)) {
            validaFalla(tarjeta, 'El numero de tarjeta de credito no es valido')
        }else{
            validaOk(tarjeta)
        }
        
        // Validando campo de CCV 
        if(!codigoValor){
            validaFalla(codigo, 'Campo vacío')
        }else if(!validaCodigo(codigoValor)) {
            validaFalla(codigo, 'El codigo debe contener maximo 3 numeros')
        }else{
            validaOk(codigo)
        }
    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje

        formControl.className = 'form-control falla'
    }
    const validaOk = (input, msje) => {
        const formControl = input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);        
    }
    const validaDni = (dni) => {
        return /^\d{8}$/.test(dni);        
    }
    const validaTarjeta = (tarjeta) => {
        return /^\d{4}\d{4}\d{4}\d{4}$/.test(tarjeta);        
    }
    const validaCodigo = (codigo) => {
        return /^\d{3}$/.test(codigo);        
    }
})




