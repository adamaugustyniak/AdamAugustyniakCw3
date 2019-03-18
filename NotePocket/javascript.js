
//initialization 
document.addEventListener('DOMContentLoaded', ShowNotes) 
//object initialization
class form  {};
//Linking the button and field to the script
form.naglowek = document.querySelector(`#tytul`);//search div with ID "tytuł" using method querySelector 
form.zawartosc = document.querySelector(`#tresc`);//search div with ID "tresc" using method querySelector 
form.btn = document.querySelector(`#btn`);

const notes = document.querySelector(`#notes`); //search div with ID "notes" using method querySelector 
//Using this method you will be able to add note objects to the div field
form.naglowek.focus();
form.zawartosc.focus();

//The function adds notes
function addNote() {
//Create a new object Data
//set variable (Year, Month, Day) from object Date
let date = new Date();
const date_year = date.getFullYear();
const date_month = date.getMonth();
const date_day= date.getDate();
// set date as one variable
const string_date = '<font size="-1">'+date_year+`.`+date_month+`.`+date_day+'</font>';

  let text1 = '<font size="+2">'+form.naglowek.value+'</font>';
  let text2 = form.zawartosc.value;
  let All="<strong>" +text1 + "</strong>"+'<br/>'+text2+'<br/>'+string_date;
  let tmp1 =localStorage.getItem('content')+'<br/>'+'<br/>'+All;
  let note = document.createElement(`div`);

  note.classList.add(`note`);
 //Add note to form
  note.innerHTML = `<br/><br/><div class='note-text'><strong>${text1}</strong></div><div class='note-text'>${text2}</div>${string_date}`;
  
//Save value to local storage
  localStorage.setItem('content',tmp1);
  notes.appendChild(note);

  // clear areatext after press button
  form.naglowek.value = ``;
  form.naglowek.focus();
  form.zawartosc.value = ``;
  form.zawartosc.focus();

}

//funcion get value from local storage and diplay on the form 

function ShowNotes() {
//get value from local storage
    let text = localStorage.getItem('content');
    let note = document.createElement(`div`);
    
    note.classList.add(`note`);
   //display on the form 
    note.innerHTML = `<div class='note-new'>${text}</div>`;
    notes.appendChild(note);
  
    // clear areatext after press button
    form.naglowek.value = ``;
    form.naglowek.focus();
    form.zawartosc.value = ``;
    form.zawartosc.focus();
  
// buttons - event listeners
form.btn.addEventListener(`click`, function (e) {
  e.preventDefault();  
  if (form.naglowek.value != `` && form.zawartosc.value != ``) {
    addNote();
      }
    }
  )
}
