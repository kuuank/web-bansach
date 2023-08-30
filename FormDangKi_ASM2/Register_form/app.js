var formElement = document.querySelector("#form-register");
var studentCardInput = formElement.querySelector("input[name='student_card']");
var fullNameInput = formElement.querySelector("input[name='fullname']");
var emailInput = formElement.querySelector("input[name='email']");
var genderContainer = formElement.querySelector(".gender-container");
var hobbiesContainer = formElement.querySelector(".hobbies-container");
var nationalitySelect = formElement.querySelector("[name='nationality']");
var noteInput = formElement.querySelector("textarea[name='note']");

function showErrorMessage(input, errorMessage) {
  var formGroup = input.parentElement;
  if (formGroup) {
    formGroup.classList.add("invalid");
    var formMessage = formGroup.querySelector(".form-message");
    if (formMessage) {
      formMessage.innerText = errorMessage;
    }
  }
}

function attachInputValidation(input, validationFunction) {
  input.oninput = handleClearError;
  input.onblur = () => validationFunction(input);
}

function attachRadioValidation(radioContainer, validationFunction) {
  var radioInputs = radioContainer.querySelectorAll("input[type='radio']");
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", () => handleClearError(radioContainer));
    radio.addEventListener("blur", () => validationFunction(radioContainer));
  });
}

function attachCheckboxValidation(checkboxContainer, validationFunction) {
  var checkboxInputs = checkboxContainer.querySelectorAll("input[type='checkbox']");
  checkboxInputs.forEach((checkbox) => {
    checkbox.addEventListener("change", () => handleClearError(checkboxContainer));
    checkbox.addEventListener("blur", () => validationFunction(checkboxContainer));
  });
}

attachInputValidation(studentCardInput, validationStudentCard);
attachInputValidation(fullNameInput, validationFullName);
attachInputValidation(emailInput, validationEmail);
attachRadioValidation(genderContainer, validationGender);
attachCheckboxValidation(hobbiesContainer, validationHobbies);
attachInputValidation(nationalitySelect, validationNationality);
attachInputValidation(noteInput, validationNote);

function handleValidate() {
  var isValid = true;
  isValid = isValid && validationStudentCard(studentCardInput);
  isValid = isValid && validationFullName(fullNameInput);
  isValid = isValid && validationEmail(emailInput);
  isValid = isValid && validationGender(genderContainer);
  isValid = isValid && validationHobbies(hobbiesContainer);
  isValid = isValid && validationNationality(nationalitySelect);
  isValid = isValid && validationNote(noteInput);
  return isValid;
}

function handleClearError(target) {
  var formGroup = target.closest(".form-group");
  if (formGroup.classList.contains("invalid")) {
    formGroup.classList.remove("invalid");
  }
  var formMessage = formGroup.querySelector(".form-message");
  if (formMessage) {
    formMessage.innerText = "";
  }
}

formElement.onsubmit = function (e) {
  e.preventDefault();
  handleValidate();
};
