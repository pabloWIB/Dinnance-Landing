/* ==========================================================================
   DINNANCE — main.js
   Single entry point. Loaded with `defer` by sign-in.html, the only screen
   with interactive behaviour. Everything runs inside one IIFE so the page
   defines no global variables.
   ========================================================================== */

(function () {
  "use strict";

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PASSWORD_MIN_LENGTH = 8;

  /**
   * Checks one field and returns an error message, or an empty string when the
   * value is acceptable.
   */
  function validate(input) {
    const value = input.value.trim();

    if (value === "") {
      return input.type === "password"
        ? "Enter your password."
        : "Enter your email address.";
    }

    if (input.type === "email" && !EMAIL_PATTERN.test(value)) {
      return "Enter a valid email address, including the @ sign.";
    }

    if (input.type === "password" && value.length < PASSWORD_MIN_LENGTH) {
      return `Your password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }

    return "";
  }

  function showError(input, message) {
    const errorBox = document.getElementById(input.getAttribute("aria-describedby"));

    input.setAttribute("aria-invalid", message === "" ? "false" : "true");

    if (errorBox) {
      errorBox.textContent = message;
    }
  }

  function initSignInForm() {
    const form = document.querySelector("[data-sign-in-form]");

    if (!form) {
      return;
    }

    const status = form.querySelector("[data-form-status]");
    const inputs = Array.from(form.querySelectorAll(".field__input"));

    if (inputs.length === 0) {
      return;
    }

    // Native validation bubbles are replaced by the inline messages below.
    form.noValidate = true;

    inputs.forEach(function (input) {
      // Validate on blur, and while correcting a field that already failed, so
      // the user is not interrupted on the first keystroke.
      input.addEventListener("blur", function () {
        showError(input, validate(input));
      });

      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") {
          showError(input, validate(input));
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let firstInvalid = null;

      inputs.forEach(function (input) {
        const message = validate(input);
        showError(input, message);

        if (message !== "" && firstInvalid === null) {
          firstInvalid = input;
        }
      });

      if (!status) {
        return;
      }

      if (firstInvalid) {
        status.setAttribute("data-state", "error");
        status.textContent = "Check the fields marked above and try again.";
        firstInvalid.focus();
        return;
      }

      status.setAttribute("data-state", "info");
      status.textContent =
        "Both fields are valid — but this demo has no authentication service, " +
        "so there is no account to sign in to yet.";
    });
  }

  initSignInForm();
})();
