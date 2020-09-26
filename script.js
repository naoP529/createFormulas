//htmlが読み込まれてからjsを実行するようにする
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    };
;}

// ラジオボタンが選択されている時だけテキストボックスに入力できるようにする
const onclick_acquisitionFormulas = () =>  {
    if (document.formulaNumber["acquisitionFormulas"][4].checked) {
        document.formulaNumber["freeDesignationformula"]. disabled = false;
    } else {
        document.formulaNumber["freeDesignationformula"]. disabled = true;
    };
};
window.onload = onclick_acquisitionFormulas();

let formulaNumber = null;
let operatorType = null;
let numberSize = null;

// どのラジオボタンが選択されているかを取得する
function getCheckedRadioButton(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].checked) {
            return buttons[i].value;
        };
    };
    return null;
};

// どのチェックボックスが選択されているかを取得する
function getCheckedCheckbox(checkbox) {
    let operatorCheked = [];
    for(let i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked) {
            operatorCheked.push(checkbox[i].value);
        }
    };
    return operatorCheked;
}

//すべての演算子を選択する
const operatorSetAll = () => {
    let operatorCheked = document.operatorType.aquisitionOperators;

    for(let i = 0; i < operatorCheked.length; i++) {
        operatorCheked[i].checked = true;
    }
}

//条件に合わせて計算問題を作成する
const createFormula = (formulaNumber, operatorType, numberSize) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < formulaNumber; i++) {
        //数と演算子を作成する
        let operators = [];
        let numbers = [];
        for (let i = 0; i < 2; i++) {
            let randomNumber = Math.floor(Math.random() * numberSize) + 1;

            numbers.push(randomNumber);
        }
        let randomOperator = operatorType[Math.floor(Math.random() * operatorType.length)];
        operators.push(randomOperator);

        // 答えを計算する
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

        // 作成した計算問題をhtmlに組み込む
        let dummyElement = document.createElement('div');

        dummyElement.insertAdjacentHTML('beforeend',
            `<div class = "formula"></div>`);
        let formula = dummyElement.lastElementChild;
        formula.insertAdjacentHTML('beforeend',
            `<p class = "temporaryFormula formulaParts">${numbers[0]} ${operators[0]} ${numbers[1]}</p>`);
        formula.insertAdjacentHTML(`beforeend`,
            `<p class = "equal formulaParts">＝</p>`);
        formula.insertAdjacentHTML('beforeend',
            `<p class = "hidden temporaryAnswer formulaParts" >${answer}</p>`);
        fragment.appendChild(formula);


    };

    let formulas = document.getElementById('formulas');
    formulas.appendChild(fragment);
}

//// 条件を設定して、決定ボタンを押した時実行される
const conditionEnter_onclick = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }
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
            formulaNumber = document.forms.formulaNumber.inputformulaNumber.value;
            break;
    };
    
    switch (numberSize) {
        case "random":
            let numbers = [9, 99, 999, 9999];
            let rondomNumberSize = numbers[Math.floor(Math.random() * numbers.length)];
            numberSize = rondomNumberSize;
            break;
        
        case "input":
            numberSize = document.forms.numberSize.inputNumberSize.value;
            break;
    };

    createFormula(formulaNumber, operatorType, numberSize);
};

//小学1年をクリックした時に実行される
const grade1_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 20;
    operatorType = ["＋", "ー"];
    numberSize = 9;

    createFormula(formulaNumber, operatorType, numberSize);
}

//小学2年をクリックした時に実行される
const grade2_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    console.log(remove_formula);
    for (let i= 0; 0 < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 30;
    operatorType = ["＋", "ー", "×"];
    numberSize = 9;

    createFormula(formulaNumber, operatorType, numberSize);
}

//小学3年をクリックした時に実行される
const grade3_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 30;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

//小学4・5年をクリックした時に実行される
const grade45_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 40;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

//小学6年をクリックした時に実行される
const grade6_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 50;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 99;

    createFormula(formulaNumber, operatorType, numberSize);
}

//激ムズをクリックした時に実行される
const highLevel_click = () => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

    formulaNumber = 100;
    operatorType = ["＋", "ー", "×", "÷"];
    numberSize = 9999;
    createFormula(formulaNumber, operatorType, numberSize);
}

//答えの表示・非表示を切り替える
const answerDisplay = () => {
    let temporaryAnswer = document.getElementsByClassName(`temporaryAnswer`);
    temporaryAnswer = Array.from(temporaryAnswer);
    for (let i = 0; 0 < temporaryAnswer.length; i++) {
        temporaryAnswer[i].classList.toggle(`hidden`);
    }
};

//計算問題を削除する
const reset_formula = () =>  {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    console.log(remove_formula)

    let sleep = (wait) => {
        let start = new Date();

        while (new Date() - start < wait){
        };
    }

    for (let i = remove_formula.length - 1; i >= 0; i--) { 
        console.log(i);
        remove_formula[i].remove(); 
        sleep(20);
    }
}

//計算問題を印刷する
const formula_print = () => {
    window.print();
}