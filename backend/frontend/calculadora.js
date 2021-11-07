const botonNumeros = document.getElementsByName('dato-numero');
const botonOperador = document.getElementsByName('dato-operador');
const botonigual = document.getElementsByName('dato-igual')[0];
const botonBorrar = document.getElementsByName('dato-borrar')[0];

let resultado = document.getElementById('resultado');
let opeActual = '';
let opeAnterior = '';
let base = document.getElementsByName('dato-numero')
let exponente = document.getElementsByName('dato-expo')
let operacion =undefined;


botonNumeros.forEach(function (boton){
     boton.addEventListener('click', function(){
         agregarNumero(boton.innerText);
     })
});

botonOperador.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerText);
    })
});

botonigual.addEventListener('click', function(){
    calcular();
    actualizarDisplay();
});

botonBorrar.addEventListener('click', function(){
    clear();
    actualizarDisplay();
});

function selectOperacion(op){
    if(opeActual === '') return;
    if(opeAnterior !== ''){
        calcular()
    }
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function pow(){
    let base = opeActual.value;
    let exponente = 2;   
    return Math.pow(base,exponente)

}

function calcular(){
    let calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
    switch(operacion){
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
                calculo = anterior / actual;
            break; 
        case 'X²':  
        console.log("Llegamos a la operación correcta")
                calculo = Math.pow(anterior, actual);
        break;  
        default:
            return;         
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';
}

function agregarNumero(num){
    opeActual = opeActual.toString() + num.toString();
    actualizarDisplay();
}

function actualizarDisplay(){
    resultado.value = opeActual;
}

function clear(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}

