const autos = require("./db_autos");
const persona = require("./personas");

let concesionaria = {
    autos: autos,
    buscarAuto: function(patente){
        for(let i = 0; i < this.autos.length; i++){
            if(this.autos[i].patente == patente){
                return this.autos[i];
            }
        }
        return null;
    },
    venderAuto: function(patente){
        let autoEncontrado = this.buscarAuto(patente);
        if(autoEncontrado != null){
            autoEncontrado.vendido = true;
        }
    },
    autosParaLaVenta: function(){
        let listadoAutos = this.autos.filter(function(auto){
            return auto.vendido == false;
        })
        return listadoAutos;
    },
    autosNuevos: function(){
        let autosParaLaVenta = this.autosParaLaVenta();
        let autos0km = autosParaLaVenta.filter(function(auto){
            return auto.km < 100;
        });
        return autos0km;
    },
    listaDeVentas: function(){
        const listadoAutos = this.autos;
        let arrayPrecios = [];
        listadoAutos.forEach(function(auto){
            if(auto.vendido == true){
                arrayPrecios.push(auto.precio)
            }
        })
        return arrayPrecios;
    },
    totalDeVentas: function(){
        let listaDeVentas = this.listaDeVentas();
        let totalVentas = listaDeVentas.reduce(function(prev, curr){
            return prev + curr;
        },0)
        return totalVentas;
    },
    puedeComprar: function(auto, persona){
        if(auto.precio <= persona.capacidadDePagoTotal && 
            persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas) ){
                return true
            }
    },
    autosQuePuedeComprar: function(persona){
        let autosParaLaVenta = this.autosParaLaVenta();
        let autosQuePuedeComprarLaPersona = autosParaLaVenta.filter(function(auto){
            return concesionaria.puedeComprar(auto, persona);
        })
        return autosQuePuedeComprarLaPersona;
    }

}



concesionaria.venderAuto("JJK116"); 
// concesionaria.venderAuto("APL123"); 
// concesionaria.autosParaLaVenta();
// console.log(concesionaria.autosNuevos());
// console.log(concesionaria.listaDeVentas());
// console.log(concesionaria.totalDeVentas());
// console.log(concesionaria.puedeComprar(concesionaria.autos[1], persona ));
console.log(concesionaria.autosQuePuedeComprar(persona));
