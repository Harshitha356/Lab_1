const STORAGE_KEY = "usersList";
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const messageDiv = document.getElementById("message");
const usersTableBody = document.getElementById("usersTableBody");
const clearAllBtn = document.getElementById("clearAllBtn");
document.addEventListener("DOMContentLoaded", () => {
  renderUsersTable();
});
function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
function showMessage(text, type = "success") {
  messageDiv.textContent = text;
  messageDiv.className = "message " + type;
  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "message";
  }, 3000);
}
function validateForm(name, email, mobile, password) {
  if (!name || !email || !mobile || !password) {
    showMessage("All fields are mandatory.", "error");
    return false;
  }

  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    showMessage("Mobile number must be exactly 10 digits.", "error");
    return false;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return false;
  }

  return true;
}
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const mobile = mobileInput.value.trim();
  const password = passwordInput.value.trim();

  if (!validateForm(name, email, mobile, password)) {
    return;
  }

  let users = getUsers();
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    showMessage("Email already registered. Please use another email.", "error");
    return;
  }

  const newUser = { name, email, mobile, password };
  users.push(newUser);
  saveUsers(users);

  showMessage("User registered successfully.", "success");
  userForm.reset();
  renderUsersTable();
});
function renderUsersTable() {
  const users = getUsers();
  usersTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = user.name;

    const emailTd = document.createElement("td");
    emailTd.textContent = user.email;

    const mobileTd = document.createElement("td");
    mobileTd.textContent = user.mobile;

    const passwordTd = document.createElement("td");
    passwordTd.textContent = user.password;

    const actionTd = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => deleteUser(index));
    actionTd.appendChild(delBtn);

    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(mobileTd);
    tr.appendChild(passwordTd);
    tr.appendChild(actionTd);

    usersTableBody.appendChild(tr);
  });
}
function deleteUser(index) {
  let users = getUsers();
  users.splice(index, 1);
  saveUsers(users);
  renderUsersTable();
  showMessage("User deleted.", "success");
}
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all users?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderUsersTable();
    showMessage("All users cleared.", "success");
  }
});
