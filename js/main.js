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

function getTableTr(groupSelects) {

  const table = document.querySelector('table');
  const trs = table.querySelectorAll('tr:not(.textAlign)');

  // console.log(trs);
  // console.log(groupSelects);

  let arr = [];

  for(let tr of trs){
    // console.log(tr);
    let str = newFunction(tr, groupSelects, arr);
  }
  // for(let elem in groupSelects){
  //   console.log(groupSelects[elem]);
  // }

}

function newFunction(tr, groupSelects, arr) {
  // console.log(tr, groupSelects, arr);

  // console.log(tr);
  // console.log(groupSelects['Критерий']);

  let tds = tr.querySelectorAll('td');

  for(let td of tds){

    for(let select of groupSelects['Критерий']){

      // console.log(td.classList.item(0));
      if (td.classList.item(0) === select) {

        console.log(td);

      }

    }

  }
}
