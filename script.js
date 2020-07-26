/*  */// const newFormula = () => {
//         for (let i = 1; i <= 30; i++) {
//             //演算子、数をランダムに表示させるための準備
//             const operators = ["＋", "ー", "×", "÷"];
//             let maximumValue = 9;
//             let minimumValue = 1;
//             let difference = maximumValue + 1 - minimumValue;
//             let calculationResult = null;
//             //1~9までの数の中からランダムに選ぶ
//             let firstTerm = Math.floor( Math.random() * difference) + minimumValue;
//             //1~9までの数の中からランダムに選ぶ
//             let secondTerm = Math.floor( Math.random() * difference) + minimumValue;
//             //準備した"operators"の演算子の中から一つ選ぶ
//             let randomOperator = operators[Math.floor(Math.random() * operators.length)];
    
//             switch (randomOperator) {
//                 case "＋":
//                     calculationResult = firstTerm + secondTerm;
//                     break;
                    
//                 case "ー":
//                     if ((firstTerm - secondTerm) < 0) {
//                         firstTerm = secondTerm;
//                         secondTerm = firstTerm;
//                     };
//                     calculationResult = firstTerm - secondTerm;
//                     break;
    
//                 case "×":
//                     calculationResult = firstTerm * secondTerm;
//                     break;
    
//                 case "÷":
//                     while (!Number.isInteger(firstTerm / secondTerm)) {
//                         secondTerm = Math.floor( Math.random() * difference) + minimumValue;
//                     }
//                     calculationResult = firstTerm / secondTerm;
//                     break;
//             }
            
        
//             let displayFormula = $(`<div class = "formula"></div>`);
//             let temporaryFormula = $(`<p class = "temporaryFormula">${firstTerm} ${randomOperator} ${secondTerm}</p>`);
//             let buttonFormula = $(` <button id = "create" type="button" onclick="newFormula()">`);
//             let temporaryAnswer = $(`<p class = "hidden temporaryAnswer" >${calculationResult}</p>`);
//             buttonFormula.click(function () {
//                 console.log($(this));
//                 temporaryAnswer.toggleClass('hidden');
//             });
//             displayFormula.append(temporaryFormula);
//             displayFormula.append(buttonFormula);
//             displayFormula.append(temporaryAnswer);
//             $('#formulas').append(displayFormula);
//         }
//         // const create = document.getElementById("create");
//         // create.addEventListener('click', function() { console.log('hoge'); newFormula(); }, false);
//         // // console.log(create);
  
//     };]

// readyのpure JavaScriptの実装とのこと。ただし今回は使ってない。
// 参照: http://youmightnotneedjquery.com/
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    };
;}

const onclick_acquisitionFormulas = () =>  {
    if (document.formulaNumber["acquisitionFormulas"][4].checked) {
        document.formulaNumber["freeDesignationformula"]. disabled = false;
    } else {
        document.formulaNumber["freeDesignationformula"]. disabled = true;
    };
};
window.onload = onclick_acquisitionFormulas();

// let termNumber = null;
let formulaNumber = null;
let operatorType = null;
let numberSize = null;

function getCheckedRadioButton(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].checked) {
            return buttons[i].value;
        };
    };
    return null;
};
 
function getCheckedCheckbox(checkbox) {
    let operatorCheked = [];
    for(let i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked) {
            operatorCheked.push(checkbox[i].value);
        }
    };
    return operatorCheked;
}

const operatorSetAll = () => {
    let operatorCheked = document.operatorType.aquisitionOperators;

    for(let i = 0; i < operatorCheked.length; i++) {
        operatorCheked[i].checked = true;
    }
}

const createFormula = (formulaNumber, operatorType, numberSize) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < formulaNumber; i++) {
        let operators = [];
        let numbers = [];
        for (let i = 0; i < 2; i++) {
            let randomNumber = Math.floor(Math.random() * numberSize) + 1;

            numbers.push(randomNumber);
        }

        // let operator = operatorType;
        // if (operatorType === "all") {
        //     let type = ["＋", "ー", "×", "÷"];
        //     let randomOperator = type[Math.floor(Math.random() * type.length)];
        //     operator = randomOperator
        // operators.push(operator);
        let randomOperator = operatorType[Math.floor(Math.random() * operatorType.length)];
        operators.push(randomOperator);

        // console.log("----------------------");
        // console.log(operators);
        // console.log(numbers);

        let answer = null;
        switch (operators[0]) {
            case "＋":
                answer = numbers[0] + numbers[1];
                break;

            case  "ー":
                if (numbers[0] < numbers[1]) {
                    let x = numbers[0];
                    numbers[0] = numbers[1];
                    numbers[1] = x;
                };
                answer = numbers[0] - numbers[1];
                break;

            case "×":
                answer = numbers[0] * numbers[1];
                break;

            case "÷":
                if (numbers[0] < numbers[1]) {
                    let x = numbers[0];
                    numbers[0] = numbers[1];
                    numbers[1] = x;
                };
                
                if (numbers[0] % numbers[1] === 0) {
                    answer = numbers[0] / numbers[1];
                } else {
                    answer = Math.floor(Math.random() * numberSize) + 1;
                    let newnumbers0 = numbers[1] * answer;
                    numbers[0] = newnumbers0;
                };
                break;
        }
        // console.log(operators, numbers, answer);

        // let numbersTest = numbers.slice(0, numbers.length);
        // for (let i = 0; i <= operators.length; i++) {
        //     let firstTerm = numbersTest[i];
        //     let secondTerm = numbersTest[i + 1];
        //     if (operators[i] === "×") {
        //         let answer = firstTerm * secondTerm;
        //         numbersTest[i] = null;
        //         numbersTest[i + 1] = answer;
        //     } else if (operators[i] === "÷") {
        //         if (firstTerm < secondTerm) {
        //             let x = firstTerm;
        //             firstTerm = secondTerm;
        //             secondTerm = x;
        //             numbersTest[i] = firstTerm;
        //             numbersTest[i + 1] = secondTerm;
        //             numbers[i] = firstTerm;
        //             numbers[i + 1] = secondTerm;
        //             console.log(firstTerm, secondTerm);
        //         };
        //         if (firstTerm % secondTerm != 0) {
        //             let answer = Math.floor(Math.random() * numberSize) + 1;
        //             console.log(`answer:${answer}`);

        //             let newFirstTerm = secondTerm * answer;
        //             console.log(`newFirstTerm:${newFirstTerm}`);
        //             numbers[i] = newFirstTerm;
        //             numbersTest[i] = null;
        //             numbersTest[i + 1] = answer;
        //             console.log(numbers[i], numbers[i + 1]);
        //             //
        //             for (let x = i; x > 0; x--) {
        //                 newNumber = numbers[i] * numbers[i]
        //             };


        //         } else {
        //             let answer = firstTerm / secondTerm;
        //             numbersTest[i] = null;
        //             numbersTest[i + 1] = answer;
        //         }; 
                
        //     };

        //     console.log(numbers);
        //     console.log(numbersTest);
        // };
        // console.log("----------------------");
        // console.log(operators);
        // console.log(numbers);

         // insertAdjacentHTML()はinnerHTMLより高速らしいが、
        // 新しいelementを作成することはできない。なので、
        // いったんdummyのelementを作成して、その直下に追加する。
        let dummyElement = document.createElement('div');

        // insertAdjacentHTML()で追加した要素は、lastElementChildで取得できる。
        // これはお決まりのパターン。jqueryを使わないとこんなに冗長になるが、
        // 最近の流行とのことなので仕方なし。
        dummyElement.insertAdjacentHTML('beforeend',
            `<div class = "formula"></div>`);
        let formula = dummyElement.lastElementChild;

        // これ以降、dummyElementは使わない。formulaを使う。
        formula.insertAdjacentHTML('beforeend',
            `<p class = "temporaryFormula formulaParts">${numbers[0]} ${operators[0]} ${numbers[1]}</p>`);
        // let temporaryFormula = formula.lastElementChild;
        // formula.insertAdjacentHTML('beforeend',

        //     `<input type = "button" value = "答え" id = "buttonAnswer">`);
        // let buttonAnswer = formula.lastElementChild;
        formula.insertAdjacentHTML(`beforeend`,
            `<p class = "equal formulaParts">＝</p>`);
        // let equal = formula.lastElementChild;
        formula.insertAdjacentHTML('beforeend',
            `<p class = "hidden temporaryAnswer formulaParts" >${answer}</p>`);
        // let temporaryAnswer = formula.lastElementChild;
        // 最後にイベントリスナーを登録
        // buttonAnswer.addEventListener('click', function() {
        //     temporaryAnswer.classList.toggle('hidden');
        // });

        // 作ったformulaはいったんfragmentに追加しておく。
        fragment.appendChild(formula);


    };

    let formulas = document.getElementById('formulas');
    formulas.appendChild(fragment);
}

const conditionEnter_onclick = () => {
    let remove_formula = document.getElementsByClassName('formula');
    console.log(remove_formula);
    for (let i= 0; 0 < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    // termNumber = getCheckedButton(document.termNumber.acquisitionTerms);
    formulaNumber = getCheckedRadioButton(document.formulaNumber.acquisitionFormulas);
    operatorType = getCheckedCheckbox(document.operatorType.aquisitionOperators);
    numberSize = getCheckedRadioButton(document.numberSize.aquisitionNumberSizes);
    
    switch (formulaNumber) {
        case "random":
            let formulaOption = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            let tmpNumber = Math.floor(Math.random() * formulaOption.length);
            let rondomFormulaNumber = formulaOption[tmpNumber];
            formulaNumber = rondomFormulaNumber;
            break;
        
        case "input":
            // let inputformulaNumber = document.getElementById("inputformulaNumber");
            // inputformulaNumber.innerText = document.forms.formulaNumber.inputformulaNumber;

            formulaNumber = document.forms.formulaNumber.inputformulaNumber.value;
            //formulaNumber = document.forms.formulaNumber.inputformulaNumber.value;
            break;
    };
    
    switch (numberSize) {
        case "random":
            let numbers = [9, 99, 999, 9999];
            let rondomNumberSize = numbers[Math.floor(Math.random() * numbers.length)];
            numberSize = rondomNumberSize;
            break;
        
        case "input":
            // let inputNumberSize = document.getElementById("inputNumberSize");
            // inputNumberSize.innerText = document.forms.numberSize.inputNumberSize;
            numberSize = document.forms.numberSize.inputNumberSize.value;
            break;
    };

    console.log("----------------------");
    console.log("----------------------");
    console.log(formulaNumber);
    console.log(operatorType);
    console.log(numberSize);

    createFormula(formulaNumber, operatorType, numberSize);
};

const grade1_click = () => {
    formulaNumber = 20;
    operatorType = ["＋", "ー"];
    numberSize = 9;

    createFormula(formulaNumber, operatorType, numberSize);
}

const grade2_click = () => {
    formulaNumber = 30;
    operatorType = ["＋", "ー", "×"];
    numberSize = 9;

    createFormula(formulaNumber, operatorType, numberSize);
}

const grade3_click = () => {
    formulaNumber = 30;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

const grade45_click = () => {
    formulaNumber = 40;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

const grade6_click = () => {
    formulaNumber = 50;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

const highLevel_click = () => {
    formulaNumber = 100;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 9999;
    // const formulaHidden = document.getElementsByClassName('formula-hidden');
    // console.log(formulaHidden);
    // for (let i = 0; 0 < formulaHidden.length; i++) {
    //     formulaHidden[i].classList.remove(`formula-hidden`);
    // }
    createFormula(formulaNumber, operatorType, numberSize);
}

const answerDisplay = () => {
    let temporaryAnswer = document.getElementsByClassName(`temporaryAnswer`);
    for (let i = 0; 0 < temporaryAnswer.length; i++) {
        temporaryAnswer[i].classList.toggle(`hidden`);
    }
};


const formula_print = () => {
    window.print();
}
// const termInput = (str, checkname) => {
//     if (str.length > 0) {
//         document.getElementById(checkname).checked = true;
//     } else {
//         document.getElementById(checkname).checked = false;
//     };
// };

// const termInputDisabled = () => {
//     if (document.termNumber["acquisitionTerms"][4]. checked) {
//         document. termNumber["freeDesignationterm"]. disabled = false;
//     } else {
//         document. termNumber["freeDesignationterm"]. disabled = true;
//     }

    
// };


