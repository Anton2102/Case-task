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
    let check = chekDoubleIndex(indTr, arr, count);
    // console.log(check == undefined);
    if (check == undefined){
      count++;
      let check2 = chekDoubleIndex(indTr, arr, count);
    }
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
  let countTRue = 0;
  // let countTFalse = 0;
  // console.log(indTr, arr, count)
  if (!(arr.hasOwnProperty(count))) {
    arr[count] = [];
    arr[count].push(indTr);
    return true;
    // arr['0'] = [];
    // arr[1] = [];
    // arr[1].push(indTr);

    // arr[2] = [];
    // arr[2].push(indTr);

  } else {

    console.log(arr.length);
    // for(let i = 0; i < arr.length; i++){
    //   console.log(arr[i][0]);
    //   console.log(indTr);
    // }
    // let countTRue = 0;
    // let countTFalse = 0;

    // console.log(arr[1][0]);
    console.log(indTr);



    console.log(arr[count][0]);
    for(let i = 0; i < indTr.length; i++){
      console.log(arr[count][0][i].innerHTML, indTr[i].innerHTML)
      if(arr[count][0][i].innerHTML == indTr[i].innerHTML){
        countTRue++;
      }
      // else {
      //   countTFalse++;
      //   count++;
      //   arr[count] = [];
      // }
    }
    if (countTRue == indTr.length){
      arr[count].push(indTr);
      return true;
    }

  }
  // console.log('Конец обхода!');
  // if (countTFalse > 0){
  //   console.log(indTr);
  //   // count++;
  //   // arr[count] = [];
  //   arr[count].push(indTr);
  // }

}
// --------------------------------------------------------------
