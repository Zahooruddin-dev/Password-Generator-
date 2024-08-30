const characters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{',
  '[', '}', ']', ',', '|', ':', ';', '<', '>', '.', '?', '/'
];

const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const copyBtn1 = document.getElementById('copyBtn1');
const copyBtn2 = document.getElementById('copyBtn2');
const generateBtn = document.getElementById('generateBtn');
const passwordLengthInput = document.getElementById('passwordLength');
const strengthIndicator = document.getElementById('strengthIndicator');
const copyNotification = document.getElementById('copyNotification');

function generatePassword(length) {
  let password1 = '';
  let password2 = '';

  for (let i = 0; i < length; i++) {
    password1 += characters[Math.floor(Math.random() * characters.length)];
    password2 += characters[Math.floor(Math.random() * characters.length)];
  }

  pass1.textContent = password1;
  pass2.textContent = password2;

  updateStrengthIndicator(password1);
}

function updateStrengthIndicator(password) {
  const length = password.length;
  let strength = 'Weak';
  
  if (length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength = 'Strong';
  } else if (length >= 8) {
    strength = 'Medium';
  }
  
  strengthIndicator.textContent = `Password Strength: ${strength}`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    copyNotification.textContent = 'Password copied to clipboard!';
    setTimeout(() => copyNotification.textContent = '', 2000); // Clear message after 2 seconds
  }).catch(err => {
    console.error('Failed to copy password: ', err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  generatePassword(parseInt(passwordLengthInput.value));

  generateBtn.addEventListener('click', () => generatePassword(parseInt(passwordLengthInput.value)));
  copyBtn1.addEventListener('click', () => copyToClipboard(pass1.textContent));
  copyBtn2.addEventListener('click', () => copyToClipboard(pass2.textContent));

  passwordLengthInput.addEventListener('change', () => generatePassword(parseInt(passwordLengthInput.value)));
});
