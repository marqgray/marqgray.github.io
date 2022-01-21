const formInputLengthRanges = {
  username: {
    minimum: 3,
    maximum: 15,
  },
  password: {
    minimum: 6,
    maximum: 25,
  },
};

const formInputErrorResponses = {
  blank: "This field cannot be blank!",
  usernameLength: `The username must be between ${formInputLengthRanges.username.minimum} to ${formInputLengthRanges.username.maximum} characters!`,
  passwordLength: `The password must be between ${formInputLengthRanges.password.minimum} to ${formInputLengthRanges.password.maximum} characters!`,
  passwordMatch: "You must confirm a matching password!",
};

// Required IDs
const idDefinitions = {
  form: "form",
  usernameInput: "username",
  emailInput: "email",
  passwordInput: "password",
  passwordConfirmationInput: "password-confirm",
};

// HTML object declarations
const htmlForm = document.getElementById(idDefinitions.form);
const htmlUsernameInput = document.getElementById(idDefinitions.usernameInput);
const htmlEmailInput = document.getElementById(idDefinitions.emailInput);
const htmlPasswordInput = document.getElementById(idDefinitions.passwordInput);
const htmlPasswordConfirmationInput = document.getElementById(
    idDefinitions.passwordConfirmationInput
);

const showError = (htmlObject, errorMessage) => {
  const formControl = htmlObject.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = errorMessage;
};

const showSuccess = (htmlObject) => {
  const formControl = htmlObject.parentElement;
  formControl.className = "form-control success";
};

const isStringValueEmpty = (string) => {
  return string === "";
};

const isValidEmail = (email) => {
  const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isFieldGreaterThanMinimumLength = (htmlInputObject, minimumNumber) => {
  const value = htmlInputObject.value;
  return value.length >= minimumNumber;
};

const isFieldLessThanMaximumLength = (htmlInputObject, maximumNumber) => {
  const value = htmlInputObject.value;
  return value.length <= maximumNumber;
};

const isFieldWithinRangeOfLength = (
    htmlInputObject,
    minimumNumber,
    maximumNumber
) => {
  return (
      isFieldGreaterThanMinimumLength(htmlInputObject, minimumNumber) &&
      isFieldLessThanMaximumLength(htmlInputObject, maximumNumber)
  );
};

// Check required fields
const isRegistrationFieldInputValid = (...htmlInputObjects) => {
  for (const htmlInputObject of htmlInputObjects) {
    if (isStringValueEmpty(htmlInputObject.value)) {
      showError(htmlInputObject, formInputErrorResponses.blank);
      continue;
    }
    switch (htmlInputObject) {
      case htmlUsernameInput:
        if (
            !isFieldWithinRangeOfLength(
                htmlInputObject,
                formInputLengthRanges.username.minimum,
                formInputLengthRanges.username.maximum
            )
        ) {
          showError(htmlInputObject, formInputErrorResponses.usernameLength);
          continue;
        }
        break;
      case htmlEmailInput:
        break;
      case htmlPasswordInput:
        if (
            !isFieldWithinRangeOfLength(
                htmlInputObject,
                formInputLengthRanges.password.minimum,
                formInputLengthRanges.password.maximum
            )
        ) {
          showError(htmlInputObject, formInputErrorResponses.passwordLength);
          continue;
        }
        break;
      case htmlPasswordConfirmationInput:
        if (htmlPasswordInput.value !== htmlInputObject.value) {
          showError(htmlInputObject, formInputErrorResponses.passwordMatch);
          continue;
        }
        break;
      default:
        break;
    }
    showSuccess(htmlInputObject);
  }
};

// Event listeners
htmlForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default trigger of the submit button
  isRegistrationFieldInputValid(
      htmlUsernameInput,
      htmlEmailInput,
      htmlPasswordInput,
      htmlPasswordConfirmationInput
  );
});
