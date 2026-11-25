(function () {
  // Let customers show or hide password fields while typing.
  document.querySelectorAll(".toggle-password").forEach((button) =>
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const visible = input.type === "password";
      input.type = visible ? "text" : "password";
      button.setAttribute(
        "aria-label",
        visible ? "Hide password" : "Show password",
      );
      button.innerHTML = visible
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';
    }),
  );

  // Check each form locally. Account actions will be handled by the backend later.
  document.querySelectorAll(".auth-form").forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      const fields = [...form.querySelectorAll("input[required]")];
      fields.forEach((input) => {
        const label = input.closest("label");
        const error = label.querySelector(".field-error");
        let message = "";
        if (!input.value.trim()) message = "This field is required.";
        else if (
          input.type === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())
        )
          message = "Enter a valid email address.";
        else if (input.name === "password" && input.value.length < 8)
          message = "Use at least 8 characters.";
        else if (
          input.name === "confirmPassword" &&
          input.value !== form.elements.password.value
        )
          message = "Passwords do not match.";
        label.classList.toggle("invalid", Boolean(message));
        error.textContent = message;
        if (message) valid = false;
      });
      const message = form.querySelector(".form-message");
      if (!valid) {
        message.style.color = "#b33";
        message.textContent = "Please check the highlighted fields.";
        return;
      }

      // Passing frontend validation does not create or verify an account.
      message.style.color = "var(--sage)";
      const type = form.dataset.form;
      if (type === "login")
        message.textContent =
          "Looks good! Backend authentication is not connected yet.";
      else if (type === "register")
        message.textContent =
          "Your details passed validation. Account creation will be connected to the backend.";
      else
        message.textContent =
          "Email looks valid. Password reset will be handled by the backend.";
    }),
  );
})();
