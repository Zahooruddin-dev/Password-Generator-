const characters = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '~`!@#$%^&*()_-+={[}],|:;<>,.?/'
};

// Create the password generator UI dynamically
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.createElement('div');
  appContainer.classList.add('password-generator');
  appContainer.innerHTML = `
    <div class="password-container">
      <div class="password" id="pass1"></div>
      <button id="copyBtn1" class="copy-btn">Copy Password 1</button>
      <div class="password" id="pass2"></div>
      <button id="copyBtn2" class="copy-btn">Copy Password 2</button>
    </div>
    <button id="generateBtn" class="btn">Generate Passwords</button>
    <label for="passwordLength">Password Length:</label>
    <input type="number" id="passwordLength" value="15" min="8" max="64">
    <div id="strengthIndicator"></div>
    <div id="entropyIndicator"></div>
    <div id="passwordHistory" class="history-container"></div>
    <div id="copyNotification"></div>
    <button id="downloadBtn" class="btn">Download Passwords</button>
  `;

  document.body.appendChild(appContainer);

  const pass1 = document.getElementById('pass1');
  const pass2 = document.getElementById('pass2');
  const copyBtn1 = document.getElementById('copyBtn1');
  const copyBtn2 = document.getElementById('copyBtn2');
  const generateBtn = document.getElementById('generateBtn');
  const passwordLengthInput = document.getElementById('passwordLength');
  const strengthIndicator = document.getElementById('strengthIndicator');
  const entropyIndicator = document.getElementById('entropyIndicator');
  const copyNotification = document.getElementById('copyNotification');
  const passwordHistory = document.getElementById('passwordHistory');
  const downloadBtn = document.getElementById('downloadBtn');

  let history = [];

  // Function to generate a password
  function generatePassword(length) {
    let password1 = '';
    let password2 = '';

    for (let i = 0; i < length; i++) {
      password1 += getRandomChar();
      password2 += getRandomChar();
    }

    pass1.textContent = shuffleString(password1);
    pass2.textContent = shuffleString(password2);

    updateStrengthIndicator(password1);
    calculateEntropy(password1);
    updatePasswordHistory(password1, password2);
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

  // Calculate password entropy
  function calculateEntropy(password) {
    const uniqueChars = new Set(password).size;
    const entropy = Math.log2(Math.pow(uniqueChars, password.length));
    entropyIndicator.textContent = `Password Entropy: ${entropy.toFixed(2)} bits`;
  }

  // Store and display last 5 generated passwords
  function updatePasswordHistory(password1, password2) {
    history.unshift({ pass1: password1, pass2: password2 });
    if (history.length > 5) history.pop();

    let historyHtml = '<h3>Recent Passwords</h3>';
    history.forEach((entry, index) => {
      historyHtml += `<div>Set ${index + 1}: ${entry.pass1}, ${entry.pass2}</div>`;
    });
    passwordHistory.innerHTML = historyHtml;
  }

  // Function to download passwords as a text file
  function downloadPasswords() {
    const blob = new Blob([`Password 1: ${pass1.textContent}\nPassword 2: ${pass2.textContent}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'passwords.txt';
    link.click();
  }

  generateBtn.addEventListener('click', () => generatePassword(parseInt(passwordLengthInput.value)));
  copyBtn1.addEventListener('click', () => copyToClipboard(pass1.textContent));
  copyBtn2.addEventListener('click', () => copyToClipboard(pass2.textContent));
  downloadBtn.addEventListener('click', downloadPasswords);

  passwordLengthInput.addEventListener('change', () => {
    const length = parseInt(passwordLengthInput.value);
    if (length < 8) passwordLengthInput.value = 8;
    if (length > 64) passwordLengthInput.value = 64;
  });
});

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
