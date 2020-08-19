let rows = document.querySelector('.firstTable').querySelectorAll('tr:not(.textAlign)');

for(let row of rows){
  let cells = row.querySelectorAll('td');

  for(let td of cells){
    // ----------------------------------------------
    // console.log(td);
    td.addEventListener('click', startEditTd);
    // ------------------------------------------------

  }

}

function startEditTd() {
  // console.log(this);
  this.removeEventListener('click', startEditTd);

  let tdValue = this.innerHTML;
  let parent = this.parentElement;

  this.innerHTML = '';

  let input = document.createElement('input');
  input.value = tdValue;

  this.appendChild(input);

  input.addEventListener('mouseout', endEditTd);
}

function endEditTd() {
  // console.log(this);
  this.removeEventListener('mouseout', endEditTd);

  let valueInput = this.value;

  let td = document.createElement('td');
  td.innerHTML = valueInput;

  let parentInput = this.parentElement;
  let tr = parentInput.parentElement;
  // console.log(tr);


  // console.log(tr);

  td.addEventListener('click', startEditTd);
}
