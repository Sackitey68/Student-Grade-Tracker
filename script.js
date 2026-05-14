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

// DOM Elements (cached for performance)
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
