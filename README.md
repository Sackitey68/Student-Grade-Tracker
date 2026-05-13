# 📊 Student Grade Tracker

**Author:** Isaac Sackey Sackitey  
**Program:** ALT School - Backend Engineering  
**Module:** JavaScript Data Structures & DOM Manipulation  
**Date:** 17th May 2026  

## 📖 Project Overview
A dynamic web application for managing student grades. Built with vanilla JavaScript, this project demonstrates proficiency in arrays/objects for data management, DOM manipulation for dynamic rendering, event handling for user interactions, and input validation — all core concepts in the ALT School Backend Engineering curriculum.

## 🛠️ Tech Stack
- HTML5 (Semantic Form & Table Structure)
- CSS3 (Responsive Layout, Visual Feedback, Bonus Highlighting)
- Vanilla JavaScript (ES6+, Arrays, Objects, DOM API, localStorage)

## 📂 Project Structure
├── index.html # Main application markup  
├── style.css # Styling + visual states + responsive design  
├── script.js # Core logic: data management, DOM updates, events  
└── README.md # Project documentation  


## 🚀 How to View
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. View live via GitHub Pages: `to be updated on netlify`

## ✅ Assignment Requirements Met

### Core Requirements
- [x] **Data Structure Usage** (3/3): 
  - Array `students[]` stores objects with `{ id, name, grade }` structure
  - Proper CRUD operations: add (push), remove (filter), read (map/render)
  
- [x] **DOM Manipulation** (3/3):
  - Dynamic table rendering from array data
  - Real-time stats updates (total students, average grade)
  - Conditional UI states (empty state vs. table view)
  
- [x] **Event Handling** (2/2):
  - Form submit → validate → add student → re-render
  - Delete button click → remove from array + DOM → update stats
  
- [x] **Input Validation** (1/1):
  - Name: non-empty, ≥2 characters
  - Grade: numeric, 0-100 range
  - Clear error messages + visual feedback

### Bonus Features (1/1)
- [x] **Above-Average Highlighting**: Rows with grades > class average get green highlight + "Above Avg" badge
- [x] **localStorage Persistence**: Student data survives page reloads; includes "Clear All Data" button

## 🔍 Key Features
| Feature | Description |
|---------|-------------|
| ➕ Add Student | Form with validation; adds to array + DOM instantly |
| 🗑️ Delete Student | Remove by ID; auto-recalculates average |
| 📈 Live Stats | Total count + average grade update in real-time |
| 🎨 Visual Feedback | Color-coded status badges, hover effects, error animations |
| 💾 Data Persistence | Auto-saves to browser localStorage |
| 🌟 Bonus Highlighting | Above-average grades highlighted in green |

## 🧪 Testing Instructions
1. Try adding invalid data (empty name, grade >100) → see error messages
2. Add 3-5 students with varying grades → watch average update
3. Delete a student → verify removal + average recalculation
4. Refresh page → confirm data persists (localStorage bonus)
5. Notice green highlight on students scoring above class average

## 📝 Notes
- Built with vanilla JavaScript only (no frameworks) to demonstrate core concepts
- Uses semantic HTML and accessible form labels
- Responsive design works on mobile and desktop
- All code is modular, commented, and follows ALT School best practices
