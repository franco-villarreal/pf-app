/* const fs = require('fs')
const typesFile = "./metadata/types.json" */

export default  {
    data: function() {
      return {
        months: {
          1: {
              value: 1,
              name: 'ENERO'
          },
          2: {
              value: 2,
              name: 'FEBRERO'
          },
          3: {
              value: 3,
              name: 'MARZO'
          },
          4: {
              value: 4,
              name: 'ABRIL'
          },
          5: {
              value: 5,
              name: 'MAYO'
          },
          6: {
              value: 6,
              name: 'JUNIO'
          },
          7: {
              value: 7,
              name: 'JULIO'
          },
          8: {
              value: 8,
              name: 'AGOSTO'
          },
          9: {
              value: 9,
              name: 'SEPTIEMBRE'
          },
          10: {
              value: 10,
              name: 'OCTUBRE'
          },
          11: {
              value: 11,
              name: 'NOVIEMBRE'
          },
          12: {
              value: 12,
              name: 'DICIEMBRE'
          }
      },
      years: {
        1: {
          value: Number(new Date().getFullYear()) - 2,
        },
        2: {
          value: Number(new Date().getFullYear()) - 1,
        },
        3: {
          value: Number(new Date().getFullYear()),
        },
        4: {
          value: Number(new Date().getFullYear()) + 1,
        },
        5: {
          value: Number(new Date().getFullYear()) + 2,
        }
      },
      categories: {
        /* 1: {
          name: "TODOS",
          value: "TODOS"
        }, */
        2: {
          name: "PAGO DE HABERES",
          value: "PAGO DE HABERES"
        },
        3: {
          name: "SERVICIO",
          value: "SERVICIO"
        },
        4: {
          name: "GASTO",
          value: "GASTO"
        },
        5: {
          name: "DEUDAS A PAGAR",
          value: "DEUDAS A PAGAR"
        },
        6: {
          name: "DEUDAS A COBRAR",
          value: "DEUDAS A COBRAR"
        },
        7: {
          name: "INVERSIONES",
          value: "INVERSIONES"
        },
        8: {
          name: "TARJETAS DE CRÉDITO",
          value: "TARJETAS DE CREDITO"
        },
        9: {
          name: "VENTAS",
          value: "VENTAS"
        },
        10: {
          name: "RETIRO DE EFECTIVO",
          value: "RETIRO DE EFECTIVO"
        }
      },
      types: {
        1: {
          name: 'INGRESO',
          value: 'INGRESO'
        },
        2: {
          name: 'EGRESO',
          value: 'EGRESO' 
        }
      }
      /* types: JSON.parse(fs.readFileSync(typesFile)) */
      }
    },
    methods : {
      formatMount: function (value) {
        return '$ ' + value;
      },
      formatText: function (string){
        return string.toUpperCase();
      }
    }
}