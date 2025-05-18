const display = document.getElementById('display');

document.addEventListener('keydown', function (event) {
 
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendToDisplay(key); // Numbers and operators
  } else if (key === 'Enter') {
    event.preventDefault(); // Prevent form submission if in a form
    calculateResult();
  } else if (key === 'Backspace') {
    removeLast();
  } else if (key === 'Delete') {
    clearDisplay();
  }else if (key === '%') {
    calculatePercentage();
  }
  else if (key === '~') {
    toggleSign();
  }
});

function appendToDisplay(value) {
  const operators = ['+', '-', '*', '/'];

  // Prevent starting with an operator (except minus for negative numbers)
  if (operators.includes(value)) {
    if (display.value === '' && value !== '-') {
      return;
    }

    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    if (operators.includes(lastChar)) {
      display.value = display.value.slice(0, -1) + value; // Replace last operator
      return;
    }
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

function removeLast() {
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  if (display.value) {
    try {
      let currentValue = eval(display.value);
      display.value = (-currentValue).toString();
    } catch {
      display.value = 'Error';
    }
  }
}

function calculatePercentage() {
  try {
    if (display.value) {
      // Evaluate current expression first (to handle cases like 50+30)
      let value = eval(display.value);
      // Convert to percentage
      display.value = (value / 100).toString();
    }
  } catch {
    display.value = 'Error';
  }
}

function autoSetThemeBasedOnTime() {
  const hour = new Date().getHours();
  const body = document.body;

  // Check if it's between 6 AM and 6 PM
  if (hour >= 6 && hour < 18) {
    if (body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme'); // Switch to light
    }
  } else {
    if (!body.getAttribute('data-theme')) {
      body.setAttribute('data-theme', 'dark'); // Switch to dark
    }
  }
}

// Run every second
window.addEventListener('DOMContentLoaded', () => {
  autoSetThemeBasedOnTime(); // Initial run
  setInterval(autoSetThemeBasedOnTime, 1000); // Recheck every second
});

