function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close modal form
 */
function closeModal() {
  modalbg.style.display = "none";
  form.emptyAll();
}

/**
 * DOM Elements
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formEl = document.forms["reserve"];
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const finishBtn = document.querySelector(".btn-finish");
const textLabel = document.querySelector(".text-label");

/**
 * add event to open the modal
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * add event to close the modal
 */
closeBtn.addEventListener("click", closeModal);

/**
 * add event to close the modal after the thank you message
 */
finishBtn.addEventListener("click", () => {
  closeModal();
  switchToForm();
});

/**
 * add event to start form verification
 */
formEl.addEventListener("submit", validate);

// ********************************************************************************
// Validation form part
// ********************************************************************************
/**
 * Returns true if value is empty and false otherwise
 * @param { String } value
 * @returns { Boolean }
 */
function isEmpty(value) {
  return value === "" ? true : false;
}

/**
 * A "form" object that manages the validation of form fields and the display of errors.
 */
const form = {
  firstName: {
    element: document.querySelector("#first"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      if (isEmpty(this.value) || this.value.length < 2) {
        this.message =
          "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        return false;
      }
      return true;
    },
  },
  lastName: {
    element: document.querySelector("#last"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      if (isEmpty(this.value) || this.value.length < 2) {
        this.message =
          "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        return false;
      }
      return true;
    },
  },
  email: {
    element: document.querySelector("#email"),
    get value() {
      return this.element.value.trim();
    },
    get valid() {
      let regexEmail = new RegExp(
        "^(\"(?:[!#-[]-~]|\\[\t -~])*\"|[!#-'*+-/-9=?A-Z^-~](?:.?[!#-'*+-/-9=?A-Z^-~])*)@([!#-'*+-/-9=?A-Z^-~](?:.?[!#-'*+-/-9=?A-Z^-~])*|[[!-Z^-~]*])$"
      );
      if (isEmpty(this.value) || !regexEmail.test(this.value)) {
        this.message = "Veuillez entrer une adresse email valide.";
        return false;
      }
      return true;
    },
  },
  birthdate: {
    element: document.querySelector("#birthdate"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (isEmpty(this.value)) {
        this.message = "Vous devez entrer votre date de naissance.";
        return false;
      }
      return true;
    },
  },
  nbTournament: {
    element: document.querySelector("#quantity"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (isEmpty(this.value)) {
        this.message = "Vous devez entrer un nombre.";
        return false;
      }
      return true;
    },
  },
  cities: {
    element: document.querySelector('input[type="radio"][name="location"]'),
    elements: document.querySelectorAll('input[type="radio"][name="location"]'),
    get value() {
      let tabV = [];
      for (let i = 0; i < this.elements.length; i++) {
        tabV.push(this.elements[i].value);
      }
      return tabV;
    },
    get valid() {
      for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].checked) {
          return true;
        }
      }
      this.message = "Vous devez choisir une option.";
      return false;
    },
  },
  gtu: {
    element: document.querySelector("#checkbox1"),
    get value() {
      return this.element.value;
    },
    get valid() {
      if (!this.element.checked) {
        this.message =
          "Vous devez vérifier que vous acceptez les termes et conditions.";
        return false;
      }
      return true;
    },
  },
  // New "valid" property that depends on the "valid" properties of internal objects
  get valid() {
    let isValid = true;

    for (const key in this) {
      if (this.hasOwnProperty(key) && key !== "valid" && key !== "emptyAll") {
        const field = this[key];

        // Check field validity and add/delete dataset attributes
        if (!field.valid) {
          isValid = false; // If a property is invalid, "valid" is false
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
  emptyAll() {
    for (const key in this) {
      if (this.hasOwnProperty(key) && key !== "valid" && key !== "emptyAll") {
        const field = this[key];

        delete field.element.parentElement.dataset.error;
        delete field.element.parentElement.dataset.errorVisible;
      }
    }
    document.forms["reserve"].reset();
  },
};
// ********************************************************************************
// End of validation form part
// ********************************************************************************

/**
 * Hides all .formData elements if status === true and displays them if === false
 * @param { Boolean } status
 */
function displayFormData(status) {
  for (let i = 0; i < formData.length; i++) {
    formData[i].hidden = status;
  }
}

/**
 * Modifies the style of the form and changes the content of textLabel to display the thank-you message
 */
function showMessage() {
  formEl.style.minHeight = "748px";
  formEl.style.display = "flex";
  formEl.style.flexDirection = "column";
  textLabel.innerHTML = "Merci pour<br>votre inscription";
  textLabel.classList.add("success-text");
}

/**
 * Restores default form style and default textLabel content
 */
function hideMessage() {
  formEl.style.removeProperty("min-height");
  formEl.style.display = "block";
  formEl.style.removeProperty("flex-direction");
  textLabel.innerHTML =
    "A quel tournoi souhaitez-vous participer cette année ?";
  textLabel.classList.remove("success-text");
}

/**
 * Changes the style and behavior of the modal's buttons, to match its state
 */
function btnsInMessage() {
  submitBtn.style.display = "none";
  finishBtn.style.display = "block";
  closeBtn.addEventListener("click", switchToForm);
  textLabel.style.marginTop = "auto";
}

/**
 * Resets the style and behavior of modal buttons to default
 */
function btnsInForm() {
  submitBtn.style.display = "block";
  finishBtn.style.display = "none";
  textLabel.style.removeProperty("margin-top");
  closeBtn.removeEventListener("click", switchToForm);
}

/**
 * Calls the functions that will display the form in the modal
 */
function switchToForm() {
  displayFormData(false); // true for hide, false for show
  hideMessage();
  btnsInForm();
}

/**
 * Calls up the functions that will display the thank-you message
 */
function switchToMessage() {
  displayFormData(true); // true for hide, false for show
  showMessage();
  btnsInMessage();
}

/**
 * Launches form validation and accompanying status changes
 * @param {*} event
 * @returns
 */
function validate(event) {
  event.preventDefault();

  if (form.valid) {
    switchToMessage();
  }
}