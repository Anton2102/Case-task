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

  for(let elem in groupSelects) {
    if (elem != '---'){
      if(groupSelects[elem] != ''){

        // let resultGroup = ;
        arrResultGroup.push(getOtherTd(arr, groupSelects, elem, trs));

      }
    }
  }

  // console.log(arrResultGroup);

  // getOtherTd(arr, groupSelects, trs);
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
function getOtherTd(arr, groupSelects, elem, trs) {

    // console.log(arr, groupSelects);

    let arrOtherFile = [];
    let count = 0;

    for(let i = 0; i < arr.length; i++){
      arrOtherFile[i] = [];
      for (let j = 0; j < arr[i].length; j++){
        arrOtherFile[i][j] = [];
        arrOtherFile[i][j].push(getTd(trs[count], groupSelects, elem));
        count++;
      }
    }

    // console.log(arrOtherFile, elem);
    let str = clearGroup(arrOtherFile, elem);
    console.log(str);

    // return arrOtherFile;

}
// -----------------------------------------------------------------
function clearGroup(arrOtherFile, elem) {
  console.log(arrOtherFile, elem);
  let arr = [];
  for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
    arr[i] = [];
  }
  console.log(arr);

  if (elem == 'Критерий'){

    for(let i = 0; i < arrOtherFile.length; i++){
      // arr[i] = [];
      console.log(arrOtherFile[i][0][0]);


      for(let j = 0; j < arrOtherFile[i][0][0].length; j++){
        // console.log(arrOtherFile[i][j]);
        console.log(j);
        arr[j].push(arrOtherFile[i][0][0][j]);
      }

    }

  }

  return arr;

}
