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
  if (score <= 1) return "Very Weak";
  if (score === 2) return "Weak";
  if (score === 3) return "Okay";
  if (score === 4) return "Strong";
  return "Excellent";
};

const getStrengthColor = (score) => {
  if (score <= 1) return "var(--danger)";
  if (score === 2) return "#f97316";
  if (score === 3) return "var(--warning)";
  if (score === 4) return "var(--success)";
  return "#22c55e";
};

export default {
  init: () => ({ value: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="pw-check">Enter Password</label>
        <input id="pw-check" type="text" placeholder="Type a password to check..." value="${state.value}" />
      </div>
      <div class="output-display" id="pw-results" style="display: none;" aria-live="polite"></div>
    `;

    const results = container.querySelector("#pw-results");
    const input = container.querySelector("#pw-check");

    const update = () => {
      const value = input.value;
      state.value = value;
      
      if (!value) {
        results.style.display = "none";
        return;
      }
      
      const score = scorePassword(value);
      const label = getLabel(score);
      const color = getStrengthColor(score);
      
      results.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <strong>Strength:</strong> <span style="color: ${color}; font-size: 1.1rem;">${label}</span>
        </div>
        <div style="background: var(--panel-alt); height: 8px; border-radius: 4px; overflow: hidden; margin: 0.5rem 0;">
          <div style="background: ${color}; height: 100%; width: ${(score / 5) * 100}%; transition: all 0.3s ease;"></div>
        </div>
        <p class="helper-text" style="margin-top: 0.5rem;">Score: ${score}/5</p>
        <p class="helper-text" style="font-size: 0.8rem; margin-top: 0.5rem;">💡 Tips: Use 12+ characters, mix uppercase, numbers, and symbols.</p>
      `;
      results.style.display = "block";
    };

    input.addEventListener("input", update);
    if (state.value) update();
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
