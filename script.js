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
    let operatorChecked = document.operatorType.aquisitionOperators;

    for(let i = 0; i < operatorChecked.length; i++) {
        operatorChecked[i].checked = true;
    }
}

//条件に合わせて計算問題を作成する
const createFormula = (formulaNumber, operatorType, numberSize) => {
    let remove_formula = document.getElementsByClassName('formula');
    remove_formula = Array.from(remove_formula);
    for (let i= 0; i < remove_formula.length; i++) {
        remove_formula[i].remove();
    }

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

    formulas.style.display = "block";
    document.getElementById("formula_mark").style.display = "none";
}

//// 条件を設定して、決定ボタンを押した時実行される
const conditionEnter_onclick = () => {

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

const grade_data = [
    {formulaNumber:20, operatorType:["＋", "ー"], numberSize:9},
    {formulaNumber:30, operatorType:["＋", "ー", "×"], numberSize:9},
    {formulaNumber:40, operatorType:["＋", "ー", "×", "÷"], numberSize:99},
    {formulaNumber:40, operatorType:["＋", "ー", "×", "÷"], numberSize:99},
    {formulaNumber:50, operatorType:["＋", "ー", "×", "÷"], numberSize:99},
    {formulaNumber:100, operatorType:["＋", "ー", "×", "÷"], numberSize:9999},
];


const grades = document.querySelectorAll(".selected-grade");
let index = null;

//レベルを選択した時に実行される
grades.forEach((grade) => {
    grade.addEventListener("click", () => {
      index = [].slice.call(grades).indexOf(grade);
      createFormula(grade_data[index].formulaNumber,
                    grade_data[index].operatorType,
                    grade_data[index].numberSize);
    });
  });


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

    for (let i = remove_formula.length - 1; i >= 0; i--) { 
        console.log(i);
        remove_formula[i].remove(); 
    }
}

//計算問題を印刷する
const formula_print = () => {
    window.print();
}

var mySwiper = new Swiper ('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    loop: true,
    speed: 500,
    autoplay: {
        delay: 5000, // スライドが切り替わるまでの表示時間(ミリ秒)
        stopOnLast: false, // 最後のスライドまで表示されたら自動再生を中止するか
        disableOnInteraction: true // ユーザーのスワイプ操作を検出したら自動再生を中止するか
    },
    disableOnInteraction:true,
  })

window.onload = function() {
    document.getElementById("formulas").style.display = "none";
    let coordinate = document.getElementById("formulas-header").getBoundingClientRect();
    console.log(coordinate.left);
    console.log(coordinate.top);
};