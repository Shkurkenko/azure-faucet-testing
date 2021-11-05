var express = require("express");
var router = express.Router();
var request = require("request");
var paymentStatus = false;
const faucetApiKey = "396c4e3b80a7f490d40ff560e549d59e9112231c"; // API ключ Димы
const faucetUrl = "https://faucetpay.io/api/v1/";
const faucetBalanceQuery = `${faucetUrl}getbalance?api_key=${faucetApiKey}`;

const googleVerify = function (req, res) {
  const captchaResponceKey = req.body.captcha;
  const verifyGoogleUrl = "https://www.google.com/recaptcha/api/siteverify";
  const secretGoogleKey = "6LcM_godAAAAADLqR0YtgA-PnT9-nHgznRuQTfs0";
  const query = `${verifyGoogleUrl}?secret=${secretGoogleKey}&response=${captchaResponceKey}&remoteip=${req.socket.remoteAddress}`;

  if (
    req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    paymentStatus = false;
    return res.json({
      success: false,
      message: "Please select captcha",
      paymentStatus: paymentStatus,
    });
  }

  request(query, (err, res, body) => {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      paymentStatus = false;
      return res.json({
        success: false,
        message: "Failed captcha verification",
        paymentStatus: paymentStatus,
      });
    }
  });
  paymentStatus = true;
  return res.json({
    success: true,
    message: "Captcha passed",
    paymentStatus: paymentStatus,
  });
};

/* GET home page. */
router.get("/", function (req, res, next) {
  request.post(
    "https://faucetpay.io/api/v1/balance?api_key=4fa46385742edc79173434c0415fb7e3085b8aba",
    (err, res, body) => {
      body = JSON.parse(body);
      console.log(body);
    }
  );
  res.render("index", { title: "Express" });
});

router.post("/submit_form", function (req, res, next) {
  googleVerify(req, res);
  console.log(`Payment status: ${paymentStatus}`);
  if (paymentStatus) {
    console.log("here will be faucet request");
  } else {
    console.log(paymentStatus);
  }
});

module.exports = router;
