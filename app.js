var app = new Vue({
    created: () => {

        setTimeout(() => {
            app.listarBebidas();
        }, 500);
        
    },
    el: '#app',
    data: {
        frutas: [
            {fruta: 'Watermelon', numero:  6},
            {fruta: 'Strawberry', numero:  5},
            {fruta: 'Pineapple', numero: 8},
            {fruta: 'Orange', numero: 10},
            {fruta: 'Kiwi', numero:  7},
            {fruta: 'Banana', numero:  9},
            {fruta: 'Limes', numero:  4},

        ],
        liquidos: [
            {liquido: 'Leche', numero:  4},
            {liquido: 'Agua', numero:  0},
            {liquido: 'Agua de coco', numero: 2},
            {liquido: 'Leche de soya', numero: 3},
            {liquido: 'Leche de almendra', numero:  1}
        ],
        proteinas: [
            'Vainilla' ,
            'Chocolate' ,
            'Coco' ,
            'Caramelo', 
            'Sin sabor'
        ],
        nombreBebida: '',
        frutaSeleccionada: '',
        liquidoSeleccionada: '',
        proteinaSeleccionada: '',
        frutaSeleccionadas: [],
        gusto: '',
        paginacion: 2,
        batidosCreados: [],
        alertBebida: false


        
    },
    watch:{
        frutaSeleccionada: (fruta) => {
            app.frutaSeleccionadas.push(fruta);
        }
    },
    methods: {
        eliminarFruta: (index) => {
            app.frutaSeleccionadas.splice(index, 1);
        },
        guardarBebida: () => {

            var calorias = 0;

            app.frutaSeleccionadas.forEach(f => {
                calorias += f.numero;
            });

            var temp = calorias;

            calorias = calorias + app.liquidoSeleccionada.numero;
           

            var bebida = {
                nombre: app.nombreBebida,
                frutas: app.frutaSeleccionadas,
                liquido: app.liquidoSeleccionada,
                proteina: app.proteinaSeleccionada,
                gusto: app.gusto,
                caloria: calorias === Infinity? temp : calorias.toFixed(0)
            }

            $.post('http://localhost:4000/api/batidos', bebida, (resp) => {
                console.log(resp);
                if(resp.ok){
                    app.listarBebidas();
                    app.frutaSeleccionadas = [];
                    app.liquidoSeleccionada = '';
                    app.proteinaSeleccionada = ''; 
                    app.gusto = '';
                    app.nombreBebida = '';
                    app.alertBebida = true;
                    app.paginacion = 2;
                    return setTimeout(() => {app.alertBebida = false;}, 3000);
                }
            });

            
        },
        listarBebidas: () => {
            $.get('http://localhost:4000/api/batidos', (resp) => {
                app.batidosCreados = resp.batidos;
            });
        }
    }
});


function filterFloat(evt,input){
    
    //$('#moneda_nac').mask('000,000,000,000,000,000,000,000.00', { reverse: true });
    
      // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
      // $('#moneda_nac').mask('000,000,000,000,000,000,000,000.00', { reverse: true });
      var key = window.Event ? evt.which : evt.keyCode;    
      var chark = String.fromCharCode(key);
      var tempValue = input.value+chark;
      if(key >= 48 && key <= 57){
          if(filter(tempValue)=== false){
              return false;
          }else{       
              return true;
          }
      }else{
            if(key == 8 || key == 13 || key == 0) {     
                return true;              
            }else if(key === 46){
                  if(filter(tempValue)=== false){
                      return false;
                  }else{       
                      return true;
                  }
            }else{
                return false;
            }
      }
  }
  function filter(__val__){
      var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
      if(preg.test(__val__) === true){
          return true;
      }else{
        return false;
      }
      
  }