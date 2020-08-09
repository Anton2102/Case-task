'use strict'

// Получение кнопки "Сгруппировать!"
const buttonStart = document.querySelector('.buttonStart');

// Навешиваем обработчик на нажатие кнопки
buttonStart.addEventListener('click', () => {

  // Получаем все select
  let selects = document.querySelectorAll('.select');
  let trs = document.querySelectorAll('tr:not(.textAlign)');

  addClassTd(trs);

  let groupSelects = getSelect(selects);
  getTableTr(groupSelects, trs);

});
// ----------------------------------------------------------------
function addClassTd(trs){

  let tr = document.querySelectorAll('tr:not(.textAlign)');

  for(let t of tr){

    let tds = t.querySelectorAll('td');

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
// -----------------------------------------------------------------------
function getSelect(selects){

  let groupSelects = {
    '---': [],
    'Критерий': [],
    'Сумма': [],
    'Макс.': [],
    'Мин.': [],
    'Конкат': []
  };

  for(let select of selects){

    for(let optionSelected in groupSelects){
      if (optionSelected == select.value) {

        groupSelects[optionSelected].push(select.name);

      }
    }

  }

  return groupSelects;

}
// ----------------------------------------------------------
function getTableTr(groupSelects, trs) {

  let arr = [];
  let count = 0;

  for(let tr of trs){

    let indTr = getTd(tr, groupSelects, 'Критерий');

    let check = chekDoubleIndex(indTr, arr, count);

    if (check == undefined){
      count++;
      let check2 = chekDoubleIndex(indTr, arr, count);
    }

  }
  let arrResultGroup = [];

  console.log(arr);
}
// -----------------------------------------------------------------
function getTd(tr, groupSelects, name) {

  let tds = tr.querySelectorAll('td');

  let result = [];

  for (let td of tds) {
    for (let sel of groupSelects[name]){
      if (sel == td.classList.item(0)){
        result.push(td);
      }
    }

  }

  return result;

}
// ---------------------------------------------------------------
function chekDoubleIndex(indTr, arr, count){
  let countTRue = 0;

  if (!(arr.hasOwnProperty(count))) {
    
    arr[count] = [];
    arr[count].push(indTr);
    return true;

  } else {

    for(let i = 0; i < indTr.length; i++){

      if(arr[count][0][i].innerHTML == indTr[i].innerHTML){
        countTRue++;
      }

    }

    if (countTRue == indTr.length){
      arr[count].push(indTr);
      return true;
    }

  }

}
// --------------------------------------------------------------------
// function getOtherTd(infoPathTr, groupSelects, elem) {
//
//   // const table = document.querySelector('table');
//   // const trs = table.querySelectorAll('tr:not(.textAlign)');
//
//   let count = 0;
//   let arrOtherFile = [];
//
//   for(let i = 0; i < infoPathTr.length; i++){
//     arrOtherFile[i] = [];
//     for (let j = 0; j < infoPathTr[i].length; j++){
//       arrOtherFile[i][j] = [];
//       arrOtherFile[i][j].push(getTd(trs[count], groupSelects, elem));
//       count++;
//     }
//   }
//   console.log(arrOtherFile);
//   // let result = clearGroup(arrOtherFile, elem);
//   // return result;
// }
// -----------------------------------------------------------------
