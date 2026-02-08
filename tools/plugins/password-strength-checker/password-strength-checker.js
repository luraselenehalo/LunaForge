const scorePassword = (value) => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  if (value.length >= 12) score += 1;
  return score;
};

const getLabel = (score) => {
  if (score <= 1) return "Very weak";
  if (score === 2) return "Weak";
  if (score === 3) return "Okay";
  if (score === 4) return "Strong";
  return "Excellent";
};

export default {
  init: () => ({ value: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="pw-check">Password</label>
        <input id="pw-check" type="text" placeholder="Type a password" value="${state.value}" />
      </div>
      <div class="panel" aria-live="polite" id="pw-results"></div>
    `;

    const results = container.querySelector("#pw-results");
    const input = container.querySelector("#pw-check");

    const update = () => {
      const value = input.value;
      state.value = value;
      const score = scorePassword(value);
      const label = getLabel(score);
      results.innerHTML = `
        <p><strong>Strength:</strong> ${label}</p>
        <p class="helper-text">Score: ${score}/5</p>
        <p class="helper-text">Tips: Use 12+ characters, mix uppercase, numbers, and symbols.</p>
      `;
    };

    input.addEventListener("input", update);
    update();
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
