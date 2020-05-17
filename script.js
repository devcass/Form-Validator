const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

function showError(element, errorMessage) {
  const formControl = element.parentElement;

  formControl.classList.remove("success");

  formControl.classList.add("error");

  const small = formControl.querySelector("small");
  small.innerText = errorMessage;
}

function showSuccess(element) {
  const formControl = element.parentElement;

  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "E-mail is not valid");
  }
}

function checkRequired(fields) {
  fields.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(field, min, max) {
  if (field.value.length < min) {
    showError(
      field,
      `${getFieldName(field)} must be at least ${min} characters`
    );
  } else if (field.value.length > max) {
    showError(
      field,
      `${getFieldName(field)} must be less than ${max} characters`
    );
  } else {
    showSuccess(field);
  }
}

function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    showSuccess(confirmPassword);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
