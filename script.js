let i = 0;
let currentImg;
let passwordCheckFlag = false;
let passwordContentFlag = [];
let visibilityButtonFlag = false;
const password1 = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const password2 = document.querySelector("#confirmPassword");
const submitButton = document.querySelector(".submit-button");
const clubForm = document.querySelector(".sign-up-form");
const passwordLabel = document.querySelector("label[for='password']");
const passwordError = document.querySelector("#password-error");
const phoneInput = document.querySelector("#phone_number");
const confirmPasswordLabel = document.querySelector(
  'label[for="confirmPassword"]'
);
const lengthValidation = document.querySelector(".length-validation");
const uppercaseValidation = document.querySelector(".uppercase-validation");
const numberValidation = document.querySelector(".number-validation");
const visibilityButton = document.querySelector(".visibility-button");

function toggleOpacity() {
  document.querySelector(".img1").style.opacity = 0;
  document.querySelector(".img2").style.opacity = 0;
}
function imageSwap() {
  setTimeout(() => {
    i = (i + 1) % 3;
    currentImg = document.querySelector(`.img${i}`);
    currentImg.style.opacity = 1;
    if (i === 0) {
      toggleOpacity();
    }
    imageSwap();
  }, 3000);
}

toggleOpacity();
imageSwap();

function passwordVisualModifier(val) {
  if (val) {
    password1.classList.add("invalid-border-color", "errorShakeAnimation");
    password2.classList.add("invalid-border-color", "errorShakeAnimation");
    setTimeout(() => {
      password1.classList.remove("errorShakeAnimation");
      password2.classList.remove("errorShakeAnimation");
    }, 500);
  } else {
    password1.classList.remove("invalid-border-color");
    password2.classList.remove("invalid-border-color");
  }

  return;
}

function inputValidation(val) {
  inputDefaultState(val);
  switch (val) {
    case "email":
      if (!emailInput.validity.valid && emailInput.value) {
        emailInput.style.borderColor = "red";
      }
      break;
    case "password1":
      if (passwordContentFlag.includes(true) && password1.value) {
        password1.style.borderColor = "red";
      }
      break;
    case "phoneNumber":
      if (!phoneInput.validity.valid && phoneInput.value) {
        phoneInput.style.borderColor = "red";
      }
      break;
  }
}

function inputDefaultState(val) {
  switch (val) {
    case "email":
      emailInput.style.borderColor = "gray";
      break;
    case "password1":
      if (!password1.value) {
        password1.style.borderColor = "gray";
        uppercaseValidation.style.color = "gray";
        numberValidation.style.color = "gray";
        lengthValidation.style.color = "gray";
      } else if (!passwordContentFlag.includes(true)) {
        password1.style.borderColor = "gray";
        uppercaseValidation.style.color = "green";
        numberValidation.style.color = "green";
        lengthValidation.style.color = "green";
      }
      break;
    case "phoneNumber":
      phoneInput.style.borderColor = "gray";
  }
}

function passwordCheck() {
  passwordVisualModifier();

  if (!/[A-Z]/.test(password1.value)) {
    uppercaseValidation.style.color = "red";
    passwordContentFlag[0] = true;
  } else {
    uppercaseValidation.style.color = "green";
    passwordContentFlag[0] = false;
  }

  if (!/\d/.test(password1.value)) {
    numberValidation.style.color = "red";
    passwordContentFlag[1] = true;
  } else {
    numberValidation.style.color = "green";
    passwordContentFlag[1] = false;
  }

  if (!/^.{8,20}$/.test(password1.value)) {
    lengthValidation.style.color = "red";
    passwordContentFlag[2] = true;
  } else {
    lengthValidation.style.color = "green";
    passwordContentFlag[2] = false;
  }

  inputDefaultState("password1");

  if (passwordCheckFlag === true) {
    passwordError.textContent = "";
    passwordCheckFlag = false;
  }
}

function toggleVisibility(val) {
  if (val === 0) {
    visibilityButton.classList.remove("password-visible");
    password1.type = "password";
  } else if (val === 1) {
    password1.type = password1.type === "password" ? "text" : "password";

    visibilityButton.classList.toggle(
      "password-visible",
      password1.type === "text"
    );
    visibilityButton.classList.toggle(
      "password-hidden",
      password1.type === "password"
    );
  } else if (val === 2) {
    password2.type = password2.type === "password" ? "text" : "password";

    visibilityButton.classList.toggle(
      "password-visible",
      password2.type === "text"
    );
    visibilityButton.classList.toggle(
      "password-hidden",
      password2.type === "password"
    );
  }
}

clubForm.addEventListener("submit", (event) => {
  console.clear();
  console.log("submit activated");
  passwordVisualModifier();

  if (password1.value === password2.value) {
    console.log("goodbye");
    alert("Form has been submitted! The form will now reload.");
    setTimeout(() => {
      reloadWebsite();
    }, 100);

    return;
  } else {
    passwordVisualModifier(1);
    event.preventDefault();
    passwordError.textContent = "Password does not match!";
    console.log("event stopped");
    passwordCheckFlag = true;
    return;
  }
});

function reloadWebsite() {
  location.reload();
  return;
}
