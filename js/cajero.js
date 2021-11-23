//Lalidación de login

var Pssword = document.getElementById("Password");

//Expresiones regulares que se utilizarán para
//valirdar los campos
const validate = {
    password: /\d\d\d\d$/,
}

//Modelo de nueva transacción

//Datos del usuario
const usuario = {
    Nombre: 'Ahs Ketchum',
    PIN: 1234,
    Cuenta: 0987654321,
    Saldo: 500,
}

//Domy model transaction

function nuevaTransaccion(tipo, monto) {
    this.tipo = tipo;
    this.monto = monto;
}

var saldo = usuario.Saldo
var examp


//Array que guarda las transacciones
var Transacciones = [];

function cargarTransacciones() {
    var newTransacciones = JSON.parse(localStorage.getItem("Transacciones"))
    saldo = Number (localStorage.getItem("Saldo"))
    examp = newTransacciones
    localStorage.clear("Saldo")
    localStorage.clear("Transacciones")
}

function incial() {
    if (!localStorage.getItem("Transacciones")) {
        var transaccionInicial = new nuevaTransaccion("Deposito", 500)
        Transacciones.push(transaccionInicial)
        localStorage.setItem("Transacciones", JSON.stringify(Transacciones))
        localStorage.setItem("Saldo", usuario.Saldo.toString())
    }
}

function login() {
    var pss = parseInt(Pssword.value) //Convertimos el string a número
    //Validación para ingreso
    if (Pssword.value.length != 4) {
        swal("Error", "El pin debe ser de 4 digitos", "error");
    } else {
        if (validate.password.test(pss) == false) {
            swal("Error", "Introducir solo números", "error");
        }
        else {
            if (pss == usuario.PIN) {
                incial()
                window.location = "Menu.html"
            } else {
                swal("Error", "PIN erroneo", "error");
            }
        }
    }
}

function depositar() {
    var montoDeposito = document.getElementById("inputMontoDeposito")

    //Validamos que no envíe en blanco
    if (montoDeposito.value != "") {
        var convierteNumero = Number(montoDeposito.value)

        var nuevoDeposito = new nuevaTransaccion('Deposito', convierteNumero);
        swal({
            title: "Confirmación transacción",
            text: "Esta seguro que desea depositar $" + convierteNumero,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Deposito realizado", {
                        icon: "success",
                    });
                    //Guardamos la transacción en el arreglo antes creado
                    cargarTransacciones()
                    examp.push(nuevoDeposito)
                    localStorage.setItem("Transacciones", JSON.stringify(examp))
                    Transacciones.push(nuevoDeposito)
                    saldo = saldo + Number(nuevoDeposito.monto)
                    localStorage.setItem("Saldo", saldo.toString());

                } else {
                    swal("Verrique el monto a depositar");
                }
            });
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    console.log(Transacciones)
    montoDeposito.value = ""
}

//Retirar

function retirar() {
    var montoRetiro = document.getElementById("inputMontoRetiro")

    if (montoRetiro.value != "") {
        var convierteNumero = Number(montoRetiro.value)
        
        var nuevoRetiro = new nuevaTransaccion('Retiro', convierteNumero);
        cargarTransacciones()
        console.log(saldo);
        
        if (convierteNumero <= saldo) {
            swal({
                title: "Confirmación transacción",
                text: "Esta seguro que desea depositar $" + convierteNumero,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Deposito realizado", {
                            icon: "success",
                        });
                        //Guardamos la transacción en el arreglo antes creado
                        examp.push(nuevoRetiro)
                        localStorage.setItem("Transacciones", JSON.stringify(examp))
                        Transacciones.push(nuevoRetiro)
                        saldo = saldo - Number(nuevoRetiro.monto)
                        localStorage.setItem("Saldo", saldo.toString())
                    } else {
                        swal("Verrique el monto a retirar");
                    }
                });
        }
        else {
            swal("Error", "Saldo insuficiente", "error")
        }
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    montoRetiro.value = ""
}

//Pago de servicio de electricidad
function pagoEnergia() {
    var pagoElectricidad = document.getElementById("electricidad")

    if (pagoElectricidad.value != "") {
        var convierteNumero = Number(pagoElectricidad.value)
        var nuevoPago = new nuevaTransaccion('Pago Electricidad', convierteNumero);
        cargarTransacciones()
        
        if (convierteNumero <= saldo) {
            console.log('Retiro')
            swal({
                title: "Confirmación transacción",
                text: "Esta seguro que desea pagar $" + convierteNumero + " del servicio de energía electrica",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Pago realizado", {
                            icon: "success",
                        });
                        //Guardamos la transacción en el arreglo antes creado
                        examp.push(nuevoPago)
                        localStorage.setItem("Transacciones", JSON.stringify(examp))
                        Transacciones.push(nuevoPago)
                        saldo = saldo - Number(nuevoPago.monto)
                        localStorage.setItem("Saldo", saldo.toString())
                    } else {
                        swal("Verrique el monto a pagar");
                    }
                });
        }
        else {
            swal("Error", "Saldo insuficiente", "error")
        }
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    pagoElectricidad.value = ''
}

function pagoInternet() {
    var pagoInte = document.getElementById("internet")

    if (pagoInte.value != "") {
        var convierteNumero = Number(pagoInte.value)
        var nuevoPago = new nuevaTransaccion('Pago Inernet', convierteNumero);
        cargarTransacciones()
        
        if (convierteNumero <= saldo) {
            console.log('Retiro')
            swal({
                title: "Confirmación transacción",
                text: "Esta seguro que desea pagar $" + convierteNumero + " del servicio de Internet",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Pago realizado", {
                            icon: "success",
                        });
                        //Guardamos la transacción en el arreglo antes creado
                        examp.push(nuevoPago)
                        localStorage.setItem("Transacciones", JSON.stringify(examp))
                        Transacciones.push(nuevoPago)
                        saldo = saldo - Number(nuevoPago.monto)
                        localStorage.setItem("Saldo", saldo.toString())
                    } else {
                        swal("Verrique el monto a pagar");
                    }
                });
        }
        else {
            swal("Error", "Saldo insuficiente", "error")
        }
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    pagoInte.value = ''
}

function pagoTelefonia() {
    var pagotelefono = document.getElementById("telefono")

    if (pagotelefono.value != "") {
        var convierteNumero = Number(pagotelefono.value)
        var nuevoPago = new nuevaTransaccion('Pago Telefonia', convierteNumero);
        cargarTransacciones()

        if (convierteNumero <= saldo) {
            console.log('Retiro')
            swal({
                title: "Confirmación transacción",
                text: "Esta seguro que desea pagar $" + convierteNumero + " del servicio de Telefonia",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Pago realizado", {
                            icon: "success",
                        });
                        //Guardamos la transacción en el arreglo antes creado
                        examp.push(nuevoPago)
                        localStorage.setItem("Transacciones", JSON.stringify(examp))
                        Transacciones.push(nuevoPago)
                        saldo = saldo - Number(nuevoPago.monto)
                        localStorage.setItem("Saldo", saldo.toString())
                    } else {
                        swal("Verrique el monto a pagar");
                    }
                });
        }
        else {
            swal("Error", "Saldo insuficiente", "error")
        }
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    pagotelefono.value = ''
}

function pagoAgua() {
    var pagoagua = document.getElementById("agua")
    
    if (pagoagua.value != "") {
        var convierteNumero = Number(pagoagua.value)
        var nuevoPago = new nuevaTransaccion('Pago Agua Potable', convierteNumero);
        cargarTransacciones()

        if (convierteNumero <= saldo) {
            console.log('Retiro')
            swal({
                title: "Confirmación transacción",
                text: "Esta seguro que desea pagar $" + convierteNumero + " del servicio de Telefonia",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Pago realizado", {
                        icon: "success",
                    });
                    //Guardamos la transacción en el arreglo antes creado
                    examp.push(nuevoPago)
                    localStorage.setItem("Transacciones", JSON.stringify(examp))
                    Transacciones.push(nuevoPago)
                    saldo = saldo - Number(nuevoPago.monto)
                    localStorage.setItem("Saldo", saldo.toString())
                    } else {
                        swal("Verrique el monto a pagar");
                    }
                });
        }
        else {
            swal("Error", "Saldo insuficiente", "error")
        }
    } else {
        swal("Error", "Introduzca una cantidad valida", "error")
    }
    pagoagua.value = ''
}

function imprimir() {
    if (Transacciones.length == 0) {
        swal("Error!", "No hay transacciones para imprimir", "error");
    } else {
        const doc = new jsPDF();

        doc.text("Cajero Pokémon Bank", 10, 30);
        doc.text("Comprobane de deposito", 10, 40);
        doc.text("Transacción xxxx0000", 10, 50);
        doc.text(`Tipo: ${Transacciones[Transacciones.length - 1].tipo}`, 10, 60);
        doc.text(`Monto: $ ${Transacciones[Transacciones.length - 1].monto}`, 10, 70);
        doc.text(`Saldo disponible: $ ${saldo}`, 10, 80)
        doc.save("comprobante.pdf");
    }
}

if (window.location.pathname == "/Estado.html") {
    var estadoCuenta = document.getElementById('estadoCuenta')

    var historialTransacciones = JSON.parse(localStorage.getItem("Transacciones"))

    estadoCuenta.innerHTML = "";
    historialTransacciones.forEach(e => {
        estadoCuenta.innerHTML += `
        <tr id="">
            <td>${e.tipo}</td>
            <td>${e.monto}</td>
        </tr>`
    })
}
