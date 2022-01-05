const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.display-temp');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearEl = document.querySelector('.clear');
//const clearLastEl = document.querySelector('.clearLast');
const button = document.querySelectorAll('.button');

let disp1Num = '';
let disp2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach(number => {
    number.addEventListener('click', (e)=>{
        if(e.target.innerText === '.' && !haveDot){
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot){
            return;
        }
        if(e.target.innerText === '0' && disp2Num == '0'){
            return;
        }
        disp2Num += e.target.innerText;
        display2El.innerText = disp2Num;
    })
});

operationEl.forEach(operation => {
    operation.addEventListener('click', (e)=>{
        if(!disp2Num && e.target.innerText === '-'){
            disp2Num += e.target.innerText;
            display2El.innerText = disp2Num;
            haveDot= false;
            return;
        } else if (!disp2Num){
            const operationName = e.target.innerText;
            clearVar(operationName);
            lastOperation = operationName;
            return;
        } else if (disp2Num == '-'){
            const operationName = e.target.innerText;
            clearVar(operationName);
            lastOperation = operationName;
            disp2rNum='';
            return;
        };
        haveDot= false;
        const operationName = e.target.innerText;
        
        if(disp1Num && disp2Num && lastOperation){
            console.log('goodbye');
            mathOperation();
        } else {
            result = parseFloat(disp2Num);
            console.log(result);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})

function clearVar(name = ''){
    disp1Num += disp2Num + ' ' + name + ' ';
    display1El.innerText = disp1Num;
    display2El.innerText = '0';
    disp2Num = '';
    tempResultEl.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'X'){
        result = parseFloat(tempResultEl.innerText) * parseFloat(disp2Num);
    } else if (lastOperation === '/'){
        result = parseFloat(tempResultEl.innerText) / parseFloat(disp2Num);
    } else if (lastOperation === '+'){
        result = parseFloat(tempResultEl.innerText) + parseFloat(disp2Num);
    } else if (lastOperation === '-'){
        result = parseFloat(tempResultEl.innerText) - parseFloat(disp2Num);
    } else if (lastOperation === '%'){
        result = parseFloat(tempResultEl.innerText) % parseFloat(disp2Num);
    }       
};

equalEl.addEventListener('click', (e)=>{
    if (disp1Num == ''){
        result = parseFloat(disp2Num);
    } else {
        mathOperation();
    }
    haveDot = false;
    display2El.innerText = result;
    
    //clearVar();
    //tempResultEl.innerText = result;
    //disp2Num = result;
    //disp1Num = '0';
    //display1El.innerText = disp1Num;
});

clearEl.addEventListener ('click', (e) => {
    display2El.innerText = '0';
    display1El.innerText = '0';
    disp2Num = '';
    disp1Num = '';
    result = '';
    tempResultEl.innerText = '0';
    haveDot = false;
});

// clearLastEl.addEventListener('click', (e)=>{
//     display2El.innerText = '0';
//     disp2Num = '';
// });

window.addEventListener('keydown', (e)=>{
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' || 
        e.key === '3' || 
        e.key === '4' || 
        e.key === '5' || 
        e.key === '6' || 
        e.key === '7' || 
        e.key === '8' ||
        e.key === '9' || 
        e.key === '.'    
    ){
        clickButtonEl(e.key);
    } else if (
        e.key === '/' ||
        e.key === '%' ||
        e.key === '-' ||
        e.key === '+' 
    ){
        clickOperation(e.key);
    } else if(e.key === '*'){
        clickOperation('X');
    } else if(e.key == 'Enter' || e.key === '='){
        clickEqual();
    }
});

function clickButtonEl(key){
    numbersEl.forEach( button => {
        if (button.innerText === key){
            button.click();
        };
    })
};

function clickOperation (key){
    operationEl.forEach(button => {
        if (button.innerText === key){
            button.click();
        }
    })
};

function clickEqual(){
    equalEl.click();
};