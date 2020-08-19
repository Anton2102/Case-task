// ----------------------------------------------
let rows = document.querySelector('.firstTable').querySelectorAll('tr:not(.textAlign)');

for(let row of rows) {
  let cells = row.querySelectorAll('td');

  for(let td of cells) {

    td.addEventListener('click', startEditTd);

  }

}
// ------------------------------------------------

function startEditTd() {
  this.removeEventListener('click', startEditTd);

  let tdValue = this.innerHTML;
  let parent = this.parentElement;

  this.innerHTML = '';

  let input = document.createElement('input');
  input.value = tdValue;

  this.appendChild(input);
  input.addEventListener('mouseout', endEditTd);

}
// -------------------------------------------------

function endEditTd() {
  this.removeEventListener('mouseout', endEditTd);

  let valueInput = this.value;
  let td = document.createElement('td');
  td.innerHTML = valueInput;

  let parentInput = this.parentElement;
  let tr = parentInput.parentElement;
  tr.replaceChild(td, parentInput);

  td.addEventListener('click', startEditTd);
}
// -----------------------------------------------
