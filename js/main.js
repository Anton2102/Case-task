'use strict'

// Получение кнопки "Сгруппировать!"
const buttonStart = document.querySelector('.buttonStart');

// Навешиваем обработчик на нажатие кнопки
buttonStart.addEventListener('click', () => {
  let resultMap = document.querySelector('.resultMap');
  resultMap.innerHTML = '';

  // Получаем все select
  let selects = document.querySelectorAll('.select');
  let trs = document.querySelectorAll('tr:not(.textAlign)');


  addClassTd(trs);

  let groupSelects = getSelect(selects);
  let resultTable = getTableTr(groupSelects, trs);
  let editResultTable = editTable(resultTable);

  resultMap.appendChild(editResultTable);

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

  return createTable(arrResultGroup);

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

    return clearGroup(arrOtherFile, elem);

}
// -----------------------------------------------------------------
function clearGroup(arrOtherFile, elem) {

  // = = = Критерий  = = =
  if (elem == 'Критерий'){
    return criterionGroup(arrOtherFile, elem);
    // = = = СУММА = = =
  } else if (elem == 'Сумма'){
    return summGroup(arrOtherFile, elem);
    // = = = Макс  = = =
  } else if(elem == 'Макс.'){
    return maxGroup(arrOtherFile, elem);
    // = = = Макс. = = =
  } else if (elem == 'Мин.'){
    return minGroup(arrOtherFile, elem);
    // = = = Конкат  = = =
  } else if (elem == 'Конкат'){
    return concatGroup(arrOtherFile, elem);
  }

}
// -----------------------------------------------------
function criterionGroup(arrOtherFile, elem){
    // console.log(arrOtherFile[0][0][0].length);
    let result = [];
    // let strA = [];

    for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
      let arr = [];
      // console.log(arrOtherFile);
      for(let j = 0; j < arrOtherFile.length; j++){
        let index;
        // console.log(arrOtherFile[j]);
        arr[j] = [];
        for(let l = 0; l < arrOtherFile[j].length; l++){
          // console.log(arrOtherFile[j][l][0]);
          if (index == undefined){
            index = arrOtherFile[j][l][0][i];
          }
        }
        arr[j].push(index);
      }
      result.push(arr);
    }
    return result;
}
// ----------------------------------------------------------------
function summGroup(arrOtherFile, elem){
  let result = [];

  for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
    let nameClassList = arrOtherFile[0][0][0][i].classList.item(0);
    let arr = [];

    for(let j = 0; j < arrOtherFile.length; j++){
      // console.log(arrOtherFile[j]);
      let summ;
      let td = document.createElement('td');
      td.classList.add(nameClassList);
      arr[j] = [];

      for(let l = 0; l < arrOtherFile[j].length; l++){

        if (summ == undefined){
          summ = Number(arrOtherFile[j][l][0][i].innerHTML);
        } else {

          summ += Number(arrOtherFile[j][l][0][i].innerHTML);

        }
      }
      td.innerHTML = summ;
      arr[j].push(td);
    }
    result.push(arr);
  }
  return result;
}
// ---------------------------------------------------------
function maxGroup(arrOtherFile, elem){
  // console.log(arrOtherFile[0][0][0].length);
  let result = [];
  // let strA = [];

  for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
    let arr = [];
    // console.log(arrOtherFile);
    for(let j = 0; j < arrOtherFile.length; j++){
      let num;
      // console.log(arrOtherFile[j]);
      arr[j] = [];
      for(let l = 0; l < arrOtherFile[j].length; l++){
        // console.log(arrOtherFile[j][l][0]);
        if (num == undefined){
          num = arrOtherFile[j][l][0][i];
        } else {
          if (Number(arrOtherFile[j][l][0][i].innerHTML) > Number(num.innerHTML)){
            num = arrOtherFile[j][l][0][i];
          }
        }
      }
      arr[j].push(num);
    }
    result.push(arr);
  }
  return result;
}
// -----------------------------------------------------------------------
function minGroup(arrOtherFile, elem){
  let result = [];

  for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
    let arr = [];

    for(let j = 0; j < arrOtherFile.length; j++){
      let num;
      arr[j] = [];

      for(let l = 0; l < arrOtherFile[j].length; l++){

        if (num == undefined){
          num = arrOtherFile[j][l][0][i];
        } else {

          if (Number(arrOtherFile[j][l][0][i].innerHTML) < Number(num.innerHTML)){
            num = arrOtherFile[j][l][0][i];
          }
        }
      }
      arr[j].push(num);
    }
    result.push(arr);
  }
  return result;
}
// -----------------------------------------------------------------
function concatGroup(arrOtherFile, elem){
  let result = [];
  // console.log(nameClassList);

  for(let i = 0; i < arrOtherFile[0][0][0].length; i++){
    let nameClassList = arrOtherFile[0][0][0][i].classList.item(0);
    let arr = [];

    for(let j = 0; j < arrOtherFile.length; j++){
      // console.log(arrOtherFile[j]);
      let str;
      let td = document.createElement('td');
      td.classList.add(nameClassList);
      arr[j] = [];

      for(let l = 0; l < arrOtherFile[j].length; l++){

        if (str == undefined){
          str = arrOtherFile[j][l][0][i].innerHTML;
        } else {

          str += '' + arrOtherFile[j][l][0][i].innerHTML;

        }
      }
      td.innerHTML = str;
      arr[j].push(td);
    }
    result.push(arr);
  }
  // console.log(result);
  return result;
}
// ------------------------------------------------------------
function createTable(arrResultGroup){

  let table = document.createElement('table');

  for(let group of arrResultGroup){
    // console.log(group);
    for(let subGroup of group){
      let tr = document.createElement('tr');
      // console.log('Создаю строку!');
      // console.log(subGroup);
      for(let i = 0; i < subGroup.length; i++){
      // for(let elem of subGroup){
        if (i == 0){
          let tdHeader = document.createElement('td');
          tdHeader.innerHTML = subGroup[i][0].classList.item(0);
          // tdHeader.classList.add('textAlign')
          tr.appendChild(tdHeader);
        }

        let nameClassTd = subGroup[i][0].classList.item(0);

        let td = document.createElement('td');
        td.innerHTML = subGroup[i][0].innerHTML;
        td.classList.add(nameClassTd);

        tr.appendChild(td);
      }

      table.appendChild(tr);
    }
  }

  return table;

}
// -----------------------------------------------------------
function editTable(resultTable){
  let count = 0;

  let tr = resultTable.rows;
  let td = tr[0].cells;

  let table = document.createElement('table');

  for(let i = 0; i < tr[0].cells.length; i++){
    let tr = document.createElement('tr');
    if (i == 0){
      tr.classList.add('textAlign');
    }

    for(let row of resultTable.rows){
      let tds = row.cells;
      let td = document.createElement('td');
      td.innerHTML = tds[count].innerHTML;
      tr.appendChild(td);
    }
    table.appendChild(tr);
    count++;
  }
  return table;

}
