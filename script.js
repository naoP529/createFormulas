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
    }
}

function onclick_acquisitionTerms4() {
    if (document.termNumber["acquisitionTerms"][4].checked) {
        document.termNumber["freeDesignationterm"]. disabled = false;
    } else {
        document.termNumber["freeDesignationterm"]. disabled = true;
    }
}
window.onload = onclick_acquisitionTerms4();

let termNumberChecked = null;
let formulaNumberChecked = null;
let operatorTypeChecked = null;
let numberSizeChecked = null;

function getCheckedButton(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].checked) {
            return buttons[i].value;
        }
    }
    return null;
}

const conditionEnter_onclick = () => {
    termNumberChecked = getCheckedButton(document.termNumber.acquisitionTerms);
    formulaNumberChecked = getCheckedButton(document.formulaNumber.acquisitionFormulas);
    operatorTypeChecked = getCheckedButton(document.operatorType.aquisitionOperators);
    numberSizeChecked = getCheckedButton(document.numberSize.aquisitionNumberSizes);


    switch (termNumberChecked) {
        case "rondom":
            let rondomTermNumber = Math.floor(Math.random() * 5) + 1;
            termNumberChecked = rondomTermNumber;
        
        case "input":
            termNumberChecked = document.forms.termNumber.inputTermNumber.value;
    }
    
    switch (formulaNumberChecked) {
        case "rondom":
            let formulaNumber = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] 
            let rondomformulaNumber = formulaNumber[Math.floor(Math.random() * formulaNumber.length)];
            formulaNumberChecked = rondomformulaNumber;
        
        case "input":
            // let inputformulaNumber = document.getElementById("inputformulaNumber");
            // inputformulaNumber.innerText = document.forms.formulaNumber.inputformulaNumber;
            formulaNumberChecked = document.forms.formulaNumber.inputformulaNumber.value;
    }
    
    switch (operatorTypeChecked) {
        case "all":
            let operators = ["＋", "ー", "×", "÷"]
            let rondomOperator = operators[Math.floor(Math.random() * operators.length)];
            operatorTypeChecked = rondomOperator;
    }
    
    switch (numberSizeChecked) {
        case "rondom":
            let rondomNumberSize = Math.floor(Math.random() * 4) + 1;
            numberSizeChecked = rondomNumberSize;
        
        case "input":
            // let inputNumberSize = document.getElementById("inputNumberSize");
            // inputNumberSize.innerText = document.forms.numberSize.inputNumberSize;
            numberSizeChecked = document.forms.numberSize.inputNumberSize.value;
    }

    console.log("----------------------");
    console.log(termNumberChecked);
    console.log(formulaNumberChecked);
    console.log(operatorTypeChecked);
    console.log(numberSizeChecked);

        // documentに計算式を逐次追加すると、追加のたびに再描画が発生し遅くなるので、
    // DocumentFragmentにいったん追加してから、最後にdocumentに追加する。
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= formulaNumberChecked; i++) {

        //演算子、数をランダムに表示させるための準備
        const operators = operatorTypeChecked;
        // let maximumValue = 9;
        // let minimumValue = 1;
        // let difference = maximumValue + 1 - minimumValue;
        // let calculationResult = null;
        // //1~9までの数の中からランダムに選ぶ
        // let firstTerm = Math.floor( Math.random() * difference) + minimumValue;
        // //1~9までの数の中からランダムに選ぶ
        // let secondTerm = Math.floor( Math.random() * difference) + minimumValue;
        // //準備した"operators"の演算子の中から一つ選ぶ
        // let randomOperator = operators[Math.floor(Math.random() * operators.length)];

        switch (randomOperator) {
            case "＋":
                calculationResult = firstTerm + secondTerm;
                break;
                
            case "ー":
                if ((firstTerm - secondTerm) < 0) {
                    firstTerm = secondTerm;
                    secondTerm = firstTerm;
                };
                calculationResult = firstTerm - secondTerm;
                break;

            case "×":
                calculationResult = firstTerm * secondTerm;
                break;

            case "÷":
                while (!Number.isInteger(firstTerm / secondTerm)) {
                    secondTerm = Math.floor( Math.random() * difference) + minimumValue;
                }
                calculationResult = firstTerm / secondTerm;
                break;
        }
    
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
            `<p class = "temporaryFormula">${firstTerm} ${randomOperator} ${secondTerm}</p>`);
        let temporaryFormula = formula.lastElementChild;
        formula.insertAdjacentHTML('beforeend',
            `<input type = "button" value = "答え" id = "buttonAnswer">`);
        let buttonAnswer = formula.lastElementChild;
        formula.insertAdjacentHTML('beforeend',
            `<p class = "hidden temporaryAnswer" >${calculationResult}</p>`);
        let temporaryAnswer = formula.lastElementChild;
        // 最後にイベントリスナーを登録
        buttonAnswer.addEventListener('click', function() {
            temporaryAnswer.classList.toggle('hidden');
        });

        // 作ったformulaはいったんfragmentに追加しておく。
        fragment.appendChild(formula);
    };

    // 最後にfragmentの内容をdocumentに移す。
    // この方法ならば再描画が一回しか起きないので高速。
    let formulas = document.getElementById('formulas');
    formulas.appendChild(fragment);

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

window.onload = termInputDisabled();

// let termLoopNumber = tempArray[0];
// let questionNumber = tempArray[1];
// let conditionsOperator = tempArray[2];
// let conditionsNumberSize = tempArray[3];

// const newFormula = () => {

//     // documentに計算式を逐次追加すると、追加のたびに再描画が発生し遅くなるので、
//     // DocumentFragmentにいったん追加してから、最後にdocumentに追加する。
//     const fragment = document.createDocumentFragment();

//     for (let i = 1; i <= 30; i++) {

//         //演算子、数をランダムに表示させるための準備
//         // const operators = ["＋", "ー", "×", "÷"];
//         // let maximumValue = 9;
//         // let minimumValue = 1;
//         // let difference = maximumValue + 1 - minimumValue;
//         // let calculationResult = null;
//         // //1~9までの数の中からランダムに選ぶ
//         // let firstTerm = Math.floor( Math.random() * difference) + minimumValue;
//         // //1~9までの数の中からランダムに選ぶ
//         // let secondTerm = Math.floor( Math.random() * difference) + minimumValue;
//         // //準備した"operators"の演算子の中から一つ選ぶ
//         // let randomOperator = operators[Math.floor(Math.random() * operators.length)];

//         switch (randomOperator) {
//             case "＋":
//                 calculationResult = firstTerm + secondTerm;
//                 break;
                
//             case "ー":
//                 if ((firstTerm - secondTerm) < 0) {
//                     firstTerm = secondTerm;
//                     secondTerm = firstTerm;
//                 };
//                 calculationResult = firstTerm - secondTerm;
//                 break;

//             case "×":
//                 calculationResult = firstTerm * secondTerm;
//                 break;

//             case "÷":
//                 while (!Number.isInteger(firstTerm / secondTerm)) {
//                     secondTerm = Math.floor( Math.random() * difference) + minimumValue;
//                 }
//                 calculationResult = firstTerm / secondTerm;
//                 break;
//         }
    
//         // insertAdjacentHTML()はinnerHTMLより高速らしいが、
//         // 新しいelementを作成することはできない。なので、
//         // いったんdummyのelementを作成して、その直下に追加する。
//         let dummyElement = document.createElement('div');

//         // insertAdjacentHTML()で追加した要素は、lastElementChildで取得できる。
//         // これはお決まりのパターン。jqueryを使わないとこんなに冗長になるが、
//         // 最近の流行とのことなので仕方なし。
//         dummyElement.insertAdjacentHTML('beforeend',
//             `<div class = "formula"></div>`);
//         let formula = dummyElement.lastElementChild;

//         // これ以降、dummyElementは使わない。formulaを使う。
//         formula.insertAdjacentHTML('beforeend',
//             `<p class = "temporaryFormula">${firstTerm} ${randomOperator} ${secondTerm}</p>`);
//         let temporaryFormula = formula.lastElementChild;
//         formula.insertAdjacentHTML('beforeend',
//             `<input type = "button" value = "答え" id = "buttonAnswer">`);
//         let buttonAnswer = formula.lastElementChild;
//         formula.insertAdjacentHTML('beforeend',
//             `<p class = "hidden temporaryAnswer" >${calculationResult}</p>`);
//         let temporaryAnswer = formula.lastElementChild;
//         // 最後にイベントリスナーを登録
//         buttonAnswer.addEventListener('click', function() {
//             temporaryAnswer.classList.toggle('hidden');
//         });

//         // 作ったformulaはいったんfragmentに追加しておく。
//         fragment.appendChild(formula);
//     };

//     // 最後にfragmentの内容をdocumentに移す。
//     // この方法ならば再描画が一回しか起きないので高速。
//     let formulas = document.getElementById('formulas');
//     formulas.appendChild(fragment);
// };
