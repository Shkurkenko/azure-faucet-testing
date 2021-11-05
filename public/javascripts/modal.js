const modalButton = document.getElementById("modal_btn");
const close = document.getElementById("close");
const modalWrapper = document.getElementById("modal_wrapper");
const walletKey = document.getElementById("walletKey").value;
const inpitWarning = document.getElementById("input_warning");

const openModal = function () {
  modalWrapper.style.display = "block";
};

const closeModal = function () {
  modalWrapper.style.display = "none";
};

modalButton.addEventListener("click", openModal, false);
close.addEventListener("click", closeModal, false);