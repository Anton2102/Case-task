'use strict'

// Получение кнопки "Сгруппировать!"
const buttonStart = document.querySelector('.buttonStart');

// Навешиваем обработчик на нажатие кнопки
buttonStart.addEventListener('click', () => {

  // Получаем все select
  let selects = document.querySelectorAll('.select');
  let tr = document.querySelectorAll('tr:not(.textAlign)');

  addClassTd(tr)
  getSelect(selects);

});

// Получаем группы выбранных селектов
function getSelect(selects){

  // делим на логические группы
  let groupSelects = {
    '---': [],
    'Критерий': [],
    'Сумма': [],
    'Макс.': [],
    'Мин.': [],
    'Конкат': []
  };

  // обходим все селекты, при совпадении
  // при совпадении значений, заносим их в логическую группу
  for(let select of selects){

    for(let optionSelected in groupSelects){
      if (optionSelected == select.value) {

        groupSelects[optionSelected].push(select.name);

      }
    }

  }

  getTableTr(groupSelects);

}


function getTableTr(groupSelects) {

  const table = document.querySelector('table');
  const trs = table.querySelectorAll('tr:not(.textAlign)');

  let arr = [];
  let count = 0;

  for(let tr of trs){
    let indTr = newFunction(tr, groupSelects);
    let checkTr = chekDoubleIndex(indTr, arr, count);
    // console.log(checkTr);

    // if (checkTr == false) {
    //   if
    //   arr[1] = [];
    //   arr[1].push(indTr);
    // }
    // arr[count] = [];
    // if(checkTr == false){
    //   // console.log(checkTr);
    //   arr[count].push(indTr);
    //   count++;
    // }
  }
  console.log(arr);
}
// -------------------------------------------------
// ПОЛУЧЕНИЕ ВЫБРАННЫХ КРИТЕРИЕВ С КАЖДОЙ СТРОКИ
function newFunction(tr, groupSelects) {

  let tds = tr.querySelectorAll('td');

  let result = [];
  // let arr = [];

  // arr[count] = [];
  for (let td of tds) {
    for (let sel of groupSelects['Критерий']){
      if (sel == td.classList.item(0)){
        result.push(td);
      }
    }

  }
  // count++;

  return result;

}
// ----------------------------------------------------

// --------------------------------------------------------
// ПОДПИСЫВАЕМ КАЖДЫЙ TD ИМЕНЕМ СТОЛБЦА
function addClassTd(trs){

  let tr = document.querySelectorAll('tr:not(.textAlign)');

  for(let t of tr){

    let tds = t.querySelectorAll('td');
    // console.log(tds);

    for(let i = 0; i < tds.length; i++){
      if (i === 0) {
        tds[i].classList.add('A');
      } else if (i === 1){
        tds[i].classList.add('B');
      } else if (i === 2){
        tds[i].classList.add('C');
      } else if (i === 3){
        tds[i].classList.add('D');
      } else if (i === 4){
        tds[i].classList.add('E');
      }
    }

  }
}
// --------------------------------------------------------------

// ----------------------------------------------------------
// ФУНКЦИЯ ПРОВЕРКИ НА ПОВТОРЕНИЯ ИНДЕКСОВ(КРИТЕРИЕВ)
function chekDoubleIndex(indTr, arr, count){
  // console.log(arr);
  if (arr.length == 0){
    arr[count] = [];
    arr[count].push(indTr);
    // arr[1] = [];
    // arr[1].push(indTr);
    // arr[2] = [];
    // arr[2].push(indTr);
    // continue;
  } else {

    console.log(arr);
    for (let elem of arr) {
      // console.log(elem);
      for (let ele of elem){
        let countTrue = 0;
        // let countFalse = 0;
        for (let i = 0; i < ele.length; i++){

          console.log(ele);
          if (ele[i].innerHTML == indTr[i].innerHTML) {
            countTrue++;
          }
          // if (ele[i].innerHTML != indTr[i].innerHTML) {
          //   countFalse++;
          // }


          // if (countTrue == ele.length) {
          //   console.log(ele[i].innerHTML == indTr[i].innerHTML);
          // }

        }
        // console.log(countFalse, ele.length);
        // console.log(countTrue == ele.length);

        if (countTrue == ele.length) {
          arr[count].push(indTr);
          break;
        }
        // console.log(countFalse);
        // if (countFalse == ele.length) {
        //   arr[count].push(indTr);
        //   break;
        // }


      }
    }

  }
}
// --------------------------------------------------------------
