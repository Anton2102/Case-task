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

// ----------------------------------------------
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
  // значений, заносим их в логическую группу
  for(let select of selects){

    for(let optionSelected in groupSelects){
      if (optionSelected == select.value) {

        groupSelects[optionSelected].push(select.name);

      }
    }

  }
  if (groupSelects['---'].length == 5) {
    return 0;
  } else {

    // Переходим у функции отбора критериев
    getTableTr(groupSelects);

  }

}
// ----------------------------------------------------------

// ---------------------------------------------------------
// ГРУППА РАЗБОРА ИНДЕКСОВ РЕЗУЛЬТИРУЮЩЕЙ ТАБЛИЦЫ
function getTableTr(groupSelects) {

  // получаем все строки по мимо заголовка
  const table = document.querySelector('table');
  const trs = table.querySelectorAll('tr:not(.textAlign)');

  // массив и счетчик для группы "критерии"
  let arr = [];
  let infoPathTr = [];
  let countInfoPathTr = 0;
  let count = 0;

  // обходим строки
  for(let tr of trs){
    // каждому тд присвоим своё логическое имя их селекта
    let indTr = getTd(tr, groupSelects, 'Критерий');

    // функция для разбора по группам
    // если функция прибрала строку на место возращется true
    let check = chekDoubleIndex(indTr, arr, count, infoPathTr, countInfoPathTr);

    // если нет, то запускаем повторную обработку
    if (check == undefined){
      count++;
      let check2 = chekDoubleIndex(indTr, arr, count, infoPathTr, countInfoPathTr);
    }
    countInfoPathTr++;
  }
  // через консоль ниже можно посмотреть результат обработки
  // --->  console.log(arr); <---
  let arrResultGroup = [];
  // console.log(groupSelects);
  for(let elem in groupSelects) {
    if (elem != '---'){
      if(groupSelects[elem] != ''){

        let resultGroup = getOtherTd(infoPathTr, groupSelects, elem);
        arrResultGroup.push(resultGroup);

      }
    }
  }
  console.log(arrResultGroup);
}

// -------------------------------------------------
// ПОЛУЧЕНИЕ ВЫБРАННЫХ КРИТЕРИЕВ С КАЖДОЙ СТРОКИ
function getTd(tr, groupSelects, name) {

  // обходим все td из строки
  let tds = tr.querySelectorAll('td');

  let result = [];

  // если class td совпадает с выбранным селектом
  // то заносим его в новый масси
  for (let td of tds) {
    for (let sel of groupSelects[name]){
      if (sel == td.classList.item(0)){
        result.push(td);
      }
    }

  }

  // возращем получившийся массив
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
function chekDoubleIndex(indTr, arr, count, infoPathTr, countInfoPathTr){
  let countTRue = 0;

  if (!(arr.hasOwnProperty(count))) {
    arr[count] = [];
    infoPathTr[count] = []

    arr[count].push(indTr);
    infoPathTr[count].push(countInfoPathTr);
    return true;

  } else {

    for(let i = 0; i < indTr.length; i++){

      if(arr[count][0][i].innerHTML == indTr[i].innerHTML){
        countTRue++;
      }

    }

    if (countTRue == indTr.length){
      arr[count].push(indTr);
      infoPathTr[count].push(countInfoPathTr);
      return true;
    }

  }

}
// --------------------------------------------------------------

// ------------------------------------------------------------------
function getOtherTd(infoPathTr, groupSelects, elem) {
  // console.log(elem);
  const table = document.querySelector('table');
  const trs = table.querySelectorAll('tr:not(.textAlign)');

  let count = 0;
  let arrOtherFile = [];
  // console.log(infoPathTr);

  for(let i = 0; i < infoPathTr.length; i++){
    arrOtherFile[i] = [];
    for (let j = 0; j < infoPathTr[i].length; j++){
      arrOtherFile[i][j] = [];
      arrOtherFile[i][j].push(getTd(trs[count], groupSelects, elem));
      count++;
    }
  }
  // for (let tr of trs){
  //   let indTr = getTd(tr, groupSelects, 'Сумма');
  //   // for(let elem)
  //   // console.log(indTr);
  // }
  let result = clearGroup(arrOtherFile, elem);
  return result;
  // console.log(result);
}

function clearGroup(arrOtherFile, name) {
  // console.log(name);
  let arr = [];

// - - - - - СУММА - - - - -
  if (name == 'Сумма'){

    for(let elem of arrOtherFile){
      let current = 0;

      for(let ele of elem){
        // console.log(ele[0][0].innerHTML);
        current += Number(ele[0][0].innerHTML);
      }

      arr.push(current);
    }

    // - - - - - МАКС. - - - - -
  } else if (name == 'Макс.') {

    for(let elem of arrOtherFile){
      let current;

      for(let ele of elem){
        if (current == undefined){
          current = Number(ele[0][0].innerHTML);
        } else {
          if (Number(ele[0][0].innerHTML) > current) {
            current = Number(ele[0][0].innerHTML);
          }
        }
        // console.log(ele[0][0].innerHTML);
        // current += Number(ele[0][0].innerHTML);
      }

      arr.push(current);
    }
    // - - - - - MIN - - - - -
  } else if (name == 'Мин.') {

    for(let elem of arrOtherFile){
      let current;

      for(let ele of elem){
        if (current == undefined){
          current = Number(ele[0][0].innerHTML);
        } else {
          if (Number(ele[0][0].innerHTML) < current) {
            current = Number(ele[0][0].innerHTML);
          }
        }
        // console.log(ele[0][0].innerHTML);
        // current += Number(ele[0][0].innerHTML);
      }

      arr.push(current);
    }
    // - - - - - Конкат  - - - - -
  } else if (name == 'Конкат') {

    for(let elem of arrOtherFile){
      let current;

      for(let ele of elem){
        if (current == undefined){
          current = ele[0][0].innerHTML;
        } else {
          current += ele[0][0].innerHTML;
        }

      }

      arr.push(current);
    }

  } else if (name == 'Критерий') {

    for(let elem of arrOtherFile){
      let current;

      for(let ele of elem){
        if (current == undefined){
          current = ele[0][0].innerHTML;
        }

      }

      arr.push(current);
    }

  }

  return arr;

}
