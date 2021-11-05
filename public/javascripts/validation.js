const mainForm = document.getElementById("main_form");
const walKey = document.getElementById("walletKey");
const modalBtn = document.getElementById("modal_btn");
const captchaWarning = document.getElementById("captcha_warning");

const checkCaptcha = () => {
  const captcha = document.querySelector("#g-recaptcha-response").value;
  fetch("/submit_form", {
    method: "POST",
    headers: {
      Accept: "application/json , text/plain , */* ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ walletKey: walKey, captcha: captcha }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        captchaWarning.style.display = "none";
      } else {
        captchaWarning.style.display = "block";
      }
      console.log(data);
    });
};

const onSubmit = (e) => {
  e.preventDefault();
  checkCaptcha();
};

const checkInput = (e) => {
  const inputWarning = document.getElementById("input_warning");
  if (walKey.value == "") {
    inputWarning.style.display = "block";
  } else {
    inputWarning.style.display = "none";
  }
};

mainForm.addEventListener("submit", onSubmit);
modalBtn.addEventListener("click", checkInput);
