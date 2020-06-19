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

const onclick_acquisitionTerms =  () =>  {
    if (document.termNumber["acquisitionTerms"][4].checked) {
        document.termNumber["freeDesignationterm"]. disabled = false;
    } else {
        document.termNumber["freeDesignationterm"]. disabled = true;
    };
};
window.onload = onclick_acquisitionTerms();

const onclick_acquisitionFormulas = () =>  {
    if (document.formulaNumber["acquisitionFormulas"][4].checked) {
        document.formulaNumber["freeDesignationformula"]. disabled = false;
    } else {
        document.formulaNumber["freeDesignationformula"]. disabled = true;
    };
};
window.onload = onclick_acquisitionFormulas();

const  onclick_aquisitionNumberSizes = () => {
    if (document.numberSize["aquisitionNumberSizes"][5].checked) {
        document.numberSize["freeDesignationNumberSize"]. disabled = false;
    } else {
        document.numberSize["freeDesignationNumberSize"]. disabled = true;
    };
};
window.onload = onclick_aquisitionNumberSizes();

let termNumber = null;
let formulaNumber = null;
let operatorType = null;
let numberSize = null;

function getCheckedButton(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].checked) {
            return buttons[i].value;
        };
    };
    return null;
};

const conditionEnter_onclick = () => {
    termNumber = getCheckedButton(document.termNumber.acquisitionTerms);
    formulaNumber = getCheckedButton(document.formulaNumber.acquisitionFormulas);
    operatorType = getCheckedButton(document.operatorType.aquisitionOperators);
    numberSize = getCheckedButton(document.numberSize.aquisitionNumberSizes);

    console.log("----------------------")
    console.log(termNumber);
    console.log(formulaNumber);
    console.log(operatorType);
    console.log(numberSize);


    switch (termNumber) {
        case "random":
            let rondomTermNumber = Math.floor(Math.random() * 5) + 2;
            termNumber = rondomTermNumber;
            break;
        
        case "input":
            termNumber = document.forms.termNumber.inputTermNumber.value;
            break;
    };
    
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
    console.log(termNumber);
    console.log(formulaNumber);
    console.log(operatorType);
    console.log(numberSize);

    // documentに計算式を逐次追加すると、追加のたびに再描画が発生し遅くなるので、
    // DocumentFragmentにいったん追加してから、最後にdocumentに追加する。
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < formulaNumber; i++) {
        let operators = [];
        let numbers = [];

        let randomNumber = Math.floor(Math.random() * numberSize) + 1;
        let randomOperator = null;
        numbers.push(randomNumber);
        
        for (let i = 1; i < termNumber; i++) {
            if (operatorType === "all") {
                let type = ["＋", "ー", "×", "÷"];
                randomOperator = type[Math.floor(Math.random() * type.length)];
                operatorType = randomOperator;
            };
            operators.push(operatorType);

            randomNumber = Math.floor(Math.random() * numberSize) + 1;
            numbers.push(randomNumber);

            // let n = i - 1;
            // switch (operators[n]) {
            //     case "＋":
            //         let additionNumber = Math.floor(Math.random() * numberSizeChecked) + 1;
            //         numbers.push(additionNumber);
            //         break;

            //     case "ー":
            //         let subtractionNumber = Math.floor (Math.random() * numberSizeChecked) + 1;
            //         numbers.push(subtractionNumber);
            //         break;

            //     case "×":
            //         let multiplicationNumber = Math.floor (Math.random() * numberSizeChecked) + 1;
            //         numbers.push(multiplicationNumber);
            //         break;

            //     case "÷":
            //         let maximum = numberSizeChecked / numbers[n];
            //         let divisionNumber = Math.floor (Math.random() * maximum) + 1;
            //         // numbers.push(divisionNumber);
            //         break;
            // }
        };
        console.log("----------------------");
        console.log(operators);
        console.log(numbers);

        let numbersTest = numbers.slice(0, numbers.length);
        for (let i = 0; i <= operators.length; i++) {
            let firstTerm = numbersTest[i];
            let secondTerm = numbersTest[i + 1];
            if (operators[i] === "×") {
                let answer = firstTerm * secondTerm;
                numbersTest[i] = null;
                numbersTest[i + 1] = answer;
            } else if (operators[i] === "÷") {
                if (firstTerm % secondTerm != 0) {
                    let answer = Math.floor(firstTerm / secondTerm);
                    let random = Math.floor(Math.random() * answer) + 1;
                    let newFirstTerm = secondTerm * random;
                    numbers[i] = newFirstTerm;
                    numbersTest[i] = null;
                    numbersTest[i] = answer;
                };
                
            };
            console.log("----------------------");
            console.log(numbers);
            console.log(numbersTest);
        };
        console.log("----------------------");
        console.log(operators);
        console.log(numbers);
    };



        // console.log(hoge);
        // let number = [];
        // for (let i = 0; i < termNumberChecked; i++) {
        //     let random = Math.floor(Math.random() * numberSizeChecked) + 1;
        //     number.push(random);
        // }

        // let operatorLoop = operatorTypeChecked - 1;
        // let operator = [];
        // for (let i = 0; i < operatorLoop; i++) {
        //     if (operatorTypeChecked === "all") {
        //         let type = ["＋", "ー", "×", "÷"];
        //         let random = type[Math.floor(Math.random() * type.length)];
        //         operatorTypeChecked = random;
        //     } 
        //     operator.push(operatorTypeChecked);
        // }

        // console.log(number);
        // console.log(operator);
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

        // switch (operatorTypeChecked) {
        //     case "＋":
        //         calculationResult = firstTerm + secondTerm;
        //         break;
                
        //     case "ー":
        //         if ((firstTerm - secondTerm) < 0) {
        //             firstTerm = secondTerm;
        //             secondTerm = firstTerm;
        //         };
        //         calculationResult = firstTerm - secondTerm;
        //         break;

        //     case "×":
        //         calculationResult = firstTerm * secondTerm;
        //         break;

        //     case "÷":
        //         while (!Number.isInteger(firstTerm / secondTerm)) {
        //             secondTerm = Math.floor( Math.random() * difference) + minimumValue;
        //         }
        //         calculationResult = firstTerm / secondTerm;
        //         break;
        // }
    
        //insertAdjacentHTML()はinnerHTMLより高速らしいが、
        // 新しいelementを作成することはできない。なので、
        // // いったんdummyのelementを作成して、その直下に追加する。
        // let dummyElement = document.createElement('div');

        // insertAdjacentHTML()で追加した要素は、lastElementChildで取得できる。
        // これはお決まりのパターン。jqueryを使わないとこんなに冗長になるが、
        // 最近の流行とのことなので仕方なし。
    //     dummyElement.insertAdjacentHTML('beforeend',
    //         `<div class = "formula"></div>`);
    //     let formula = dummyElement.lastElementChild;

    //     // これ以降、dummyElementは使わない。formulaを使う。
    //     formula.insertAdjacentHTML('beforeend',
    //         `<p class = "temporaryFormula">${firstTerm} ${randomOperator} ${secondTerm}</p>`);
    //     let temporaryFormula = formula.lastElementChild;
    //     formula.insertAdjacentHTML('beforeend',
    //         `<input type = "button" value = "答え" id = "buttonAnswer">`);
    //     let buttonAnswer = formula.lastElementChild;
    //     formula.insertAdjacentHTML('beforeend',
    //         `<p class = "hidden temporaryAnswer" >${calculationResult}</p>`);
    //     let temporaryAnswer = formula.lastElementChild;
    //     // 最後にイベントリスナーを登録
    //     buttonAnswer.addEventListener('click', function() {
    //         temporaryAnswer.classList.toggle('hidden');
    //     });

    //     // 作ったformulaはいったんfragmentに追加しておく。
    //     fragment.appendChild(formula);
    // };

    // // 最後にfragmentの内容をdocumentに移す。
    // // この方法ならば再描画が一回しか起きないので高速。
    // let formulas = document.getElementById('formulas');
    // formulas.appendChild(fragment);

};

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

