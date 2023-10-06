function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Bloc de validation !
//

function validateText(str, type) {
  if (str.length < 2) {
    throw new Error(`Le champ ${type} est trop court.`);
  }
}

function validateEmail(email) {
  let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

  if (!regexEmail.test(email)) {
    throw new Error("L'email est invalide.");
  }
}

function validateDate(date) {
  if (!date) {
    throw new Error("Veuillez entrer une date.");
  }
}

function validateNbTournament(nbTournament) {
  if (!nbTournament) {
    throw new Error("Veuillez indiquer le nombre de tournois auxquels vous avez participé.");
  }
}

function validateRadio(btnRadio) {
  for(let i = 0; i < btnRadio.length; i++) {
    if (btnRadio[i].checked) {
      return ;
    }
  }
  throw new Error("Veuillez selectionner une ville.");
}

function validateTandC(checkboxTandC) {
  if (!checkboxTandC.checked) {
    throw new Error("Veuillez accepter les conditions générales.");
  }
}

function validate(event) {
  event.preventDefault();
  console.log("je valide ou pas ?");
  try {
    let firstName = document.querySelector("#first").value;
    // console.log(firstName)
    validateText(firstName, "prénom");
    
    let lastName = document.querySelector("#last").value;
    // console.log(lastName)
    validateText(lastName, "nom");

    let email = document.querySelector("#email").value;
    validateEmail(email);
    
    let date = document.querySelector("#birthdate").value;
    validateDate(date);
    
    let nbTournament = document.querySelector("#quantity").value;
    validateNbTournament(nbTournament);

    let btnRadio = document.querySelectorAll('input[type="radio"][name="location"]')
    validateRadio(btnRadio);
    
    let checkboxTandC  = document.querySelector("#checkbox1")
    validateTandC(checkboxTandC);

  } catch(error) {
    console.log(error.message)
    return ;
  }
  document.forms["reserve"].submit();
}