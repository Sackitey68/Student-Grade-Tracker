/**
 * ALT School - Student Grade Tracker
 * Author: Isaac Sackey Sackitey
 * Module: JavaScript Data Structures & DOM
 * Date: 17th May 2026
 *
 * Features:
 * - Array/Object data structure for students
 * - DOM manipulation for dynamic rendering
 * - Event handling for add/delete
 * - Input validation
 * - BONUS: localStorage persistence + above-average highlighting
 */

// === DATA STRUCTURE ===
// Array to store student objects: { id, name, grade }
let students = [];

// DOM Elements
const studentForm = document.getElementById("studentForm");
const studentNameInput = document.getElementById("studentName");
const studentGradeInput = document.getElementById("studentGrade");
const formError = document.getElementById("formError");
const studentList = document.getElementById("studentList");
const studentTable = document.getElementById("studentTable");
const emptyState = document.getElementById("emptyState");
const totalStudentsEl = document.getElementById("totalStudents");
const averageGradeEl = document.getElementById("averageGrade");
const clearDataBtn = document.getElementById("clearDataBtn");

// === INITIALIZATION ===
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderStudents();
  updateStats();
});

// === CORE FUNCTIONS ===

/**
 * Generate unique ID for each student
 * @returns {number} Unique timestamp-based ID
 */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Validate student input
 * @param {string} name - Student name
 * @param {string|number} grade - Student grade
 * @returns {string|null} Error message or null if valid
 */
function validateInput(name, grade) {
  const trimmedName = name.trim();
  const gradeNum = Number(grade);

  if (!trimmedName) {
    return "Student name cannot be empty";
  }

  if (trimmedName.length < 2) {
    return "Name must be at least 2 characters";
  }

  if (grade === "" || isNaN(gradeNum)) {
    return "Grade must be a valid number";
  }

  if (gradeNum < 0 || gradeNum > 100) {
    return "Grade must be between 0 and 100";
  }

  return null;
}

/**
 * Add a new student to the array
 * @param {string} name - Student name
 * @param {number} grade - Student grade
 */
function addStudent(name, grade) {
  const newStudent = {
    id: generateId(),
    name: name.trim(),
    grade: Number(grade),
  };

  students.push(newStudent);
  saveToLocalStorage();
  renderStudents();
  updateStats();
}

/**
 * Remove a student by ID
 * @param {number} id - Student ID to remove
 */
function removeStudent(id) {
  students = students.filter((student) => student.id !== id);
  saveToLocalStorage();
  renderStudents();
  updateStats();
}

/**
 * Calculate average grade from students array
 * @returns {number|null} Average grade or null if no students
 */
function calculateAverage() {
  if (students.length === 0) return null;

  const total = students.reduce((sum, student) => sum + student.grade, 0);
  return total / students.length;
}

/**
 * Get the current average for highlighting logic
 * @returns {number|null}
 */
function getCurrentAverage() {
  if (students.length === 0) return null;
  return calculateAverage();
}

// === DOM MANIPULATION ===

/**
 * Render the student list to the DOM
 */
function renderStudents() {
  if (students.length === 0) {
    emptyState.classList.remove("hidden");
    studentTable.classList.add("hidden");
    studentList.innerHTML = "";
    return;
  }

  emptyState.classList.add("hidden");
  studentTable.classList.remove("hidden");

  // Clear current list
  studentList.innerHTML = "";

  // Get average for highlighting
  const average = getCurrentAverage();

  // Render each student
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    // Highlight above-average students
    if (average !== null && student.grade > average) {
      row.classList.add("above-average");
    }

    // Status badge logic
    const statusClass =
      average !== null && student.grade > average
        ? "status-above"
        : "status-below";
    const statusText =
      average !== null && student.grade > average ? "Above Avg" : "Below Avg";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(student.name)}</strong></td>
      <td><span class="grade-badge">${student.grade}</span></td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td>
        <button class="delete-btn" data-id="${student.id}">🗑️ Delete</button>
      </td>
    `;

    studentList.appendChild(row);
  });

  // Attach delete event listeners to new buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      removeStudent(id);
    });
  });
}

/**
 * Update stats display (total students + average)
 */
function updateStats() {
  totalStudentsEl.textContent = students.length;

  const average = calculateAverage();
  if (average === null) {
    averageGradeEl.textContent = "—";
  } else {
    averageGradeEl.textContent = average.toFixed(1);
  }
}

/**
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// === LOCALSTORAGE FUNCTIONS  ===

/**
 * Save students array to localStorage
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem("altStudents", JSON.stringify(students));
  } catch (error) {
    console.warn("Could not save to localStorage:", error);
  }
}

/**
 * Load students array from localStorage
 */
function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem("altStudents");
    if (saved) {
      students = JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Could not load from localStorage:", error);
    students = [];
  }
}

/**
 * Clear all data from localStorage and reset app
 */
function clearAllData() {
  if (
    confirm(
      "Are you sure you want to delete all student data? This cannot be undone.",
    )
  ) {
    students = [];
    localStorage.removeItem("altStudents");
    renderStudents();
    updateStats();
  }
}

// === EVENT HANDLING ===

// Form Submission: Add Student
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = studentNameInput.value;
  const grade = studentGradeInput.value;

  // Validate input
  const error = validateInput(name, grade);
  if (error) {
    formError.textContent = error;
    // Shake animation for feedback
    studentForm.style.animation = "shake 0.3s ease";
    setTimeout(() => {
      studentForm.style.animation = "";
    }, 300);
    return;
  }

  // Clear error and add student
  formError.textContent = "";
  addStudent(name, grade);

  // Reset form
  studentForm.reset();
  studentNameInput.focus();
});

// Clear Data Button
clearDataBtn.addEventListener("click", clearAllData);

// Real-time error clearing on input
studentNameInput.addEventListener("input", () => {
  if (formError.textContent) formError.textContent = "";
});

studentGradeInput.addEventListener("input", () => {
  if (formError.textContent) formError.textContent = "";
});

// Add shake animation via JS (since we can't modify CSS dynamically easily)
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);
