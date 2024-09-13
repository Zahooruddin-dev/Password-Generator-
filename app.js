const characters = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '~`!@#$%^&*()_-+={[}],|:;<>,.?/'
};

const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const copyBtn1 = document.getElementById('copyBtn1');
const copyBtn2 = document.getElementById('copyBtn2');
const generateBtn = document.getElementById('generateBtn');
const passwordLengthInput = document.getElementById('passwordLength');
const strengthIndicator = document.getElementById('strengthIndicator');
const copyNotification = document.getElementById('copyNotification');

// Function to generate password based on specific rules
function generatePassword(length) {
  let password1 = '';
  let password2 = '';

  // Ensure each password contains at least one character from each set
  for (let i = 0; i < length; i++) {
    password1 += getRandomChar();
    password2 += getRandomChar();
  }

  pass1.textContent = shuffleString(password1);
  pass2.textContent = shuffleString(password2);

  updateStrengthIndicator(password1);
}

function getRandomChar() {
  const sets = [characters.upper, characters.lower, characters.numbers, characters.symbols];
  const randomSet = sets[Math.floor(Math.random() * sets.length)];
  return randomSet[Math.floor(Math.random() * randomSet.length)];
}

function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function updateStrengthIndicator(password) {
  let strength = 'Weak';
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (length >= 16 && hasUpper && hasLower && hasNumber && hasSymbol) {
    strength = 'Very Strong';
  } else if (length >= 12 && (hasUpper || hasLower) && hasNumber && hasSymbol) {
    strength = 'Strong';
  } else if (length >= 8 && (hasUpper || hasLower)) {
    strength = 'Medium';
  }

  strengthIndicator.textContent = `Password Strength: ${strength}`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    copyNotification.textContent = 'Password copied to clipboard!';
    setTimeout(() => copyNotification.textContent = '', 2000);
  }).catch(err => {
    console.error('Failed to copy password: ', err);
    copyNotification.textContent = 'Failed to copy password.';
    setTimeout(() => copyNotification.textContent = '', 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  generateBtn.addEventListener('click', () => generatePassword(parseInt(passwordLengthInput.value)));
  copyBtn1.addEventListener('click', () => copyToClipboard(pass1.textContent));
  copyBtn2.addEventListener('click', () => copyToClipboard(pass2.textContent));

  passwordLengthInput.addEventListener('change', () => {
    const length = parseInt(passwordLengthInput.value);
    if (length < 8) {
      passwordLengthInput.value = 8; // Minimum password length
    }
    if (length > 32) {
      passwordLengthInput.value = 32; // Maximum password length
    }
  });
});
