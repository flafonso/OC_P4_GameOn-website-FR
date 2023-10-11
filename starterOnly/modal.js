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


// ********************************************************************************
// Validation part !
// ********************************************************************************
function isEmpty(value) {
  return value === "" ? true : false;
}
function isBetween(length, min, max) {
  return   min > length || length > max ? false : true;
}

// A "form" object that manages the validation of form fields and the display of errors.
const form = {
  firstName : {
    element : document.querySelector("#first"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      if (isEmpty(this.value) || !isBetween(this.value.length, 2, 25)) {
        this.message = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        return false;
      }
      return true;
    }
  },
  lastName : {
    element : document.querySelector("#last"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      if (isEmpty(this.value) || !isBetween(this.value.length, 2, 25)) {
        this.message = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        return false;
      }
      return true;
    }
  },
  email : {
    element : document.querySelector("#email"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
      if (isEmpty(this.value) || !regexEmail.test(this.value)) {
        this.message = "Veuillez entrer une adresse email valide.";
        return false;
      }
      return true;
    }
  },
  birthdate : {
    element : document.querySelector("#birthdate"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (isEmpty(this.value)) {
        this.message = "Vous devez entrer votre date de naissance.";
        return false;
      }
      return true;
    }
  },
  nbTournament : {
    element : document.querySelector("#quantity"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (isEmpty(this.value)) {
        this.message = "Vous devez entrer un nombre.";
        return false;
      }
      return true;
    }
  },
  cities : {
    element : document.querySelector('input[type="radio"][name="location"]'),
    elements : document.querySelectorAll('input[type="radio"][name="location"]'),
    get value() {
      let tabV = [];
      for(let i = 0; i < this.elements.length; i++) {
        tabV.push(this.elements[i].value);
      }
      return tabV;
    },
    get valid() {
      for(let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].checked) {
          return true;
        }
      }
      this.message = "Vous devez choisir une option.";
      return false;
    }
  },
  gtu : {
    element : document.querySelector("#checkbox1"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (!this.element.checked) {
        this.message = "Vous devez vérifier que vous acceptez les termes et conditions.";
        return false;
      }
      return true;
    }
  },
  // New "valid" property that depends on the "valid" properties of internal objects
  get valid() {
    let isValid = true;

    for (const key in this) {
      if (this.hasOwnProperty(key) && key !== "valid") {
        // console.log(`key = ${key}, => ${key}.valid = ${this[key].valid}`);
        const field = this[key];

        // Check field validity and add/delete dataset attributes
        if (!field.valid) {
          isValid = false; // If a property is invalid, "valid" is false
          // console.log(field);
          field.element.parentElement.dataset.error = field.message;
          field.element.parentElement.dataset.errorVisible = "true";
        } else {
          delete field.element.parentElement.dataset.error;
          delete field.element.parentElement.dataset.errorVisible;
        }
      }
    }
    return isValid; // If all internal properties are valid, "valid" is true
  },
}

function validate(event) {
  event.preventDefault();

  // submit to the server if the form is valid
  if (form.valid) {
    document.forms["reserve"].submit();
  }
}