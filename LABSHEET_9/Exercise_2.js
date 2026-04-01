// Child component: reusable student card
function StudentCard(props) {
  const { name, department, marks } = props; // props from parent

  return (
    <div className="student-card">
      <p className="student-name">{name}</p>

      <div className="detail-row">
        <span className="label">Department:</span>
        <span className="value">{department}</span>
      </div>

      <div className="detail-row">
        <span className="label">Marks:</span>
        <span className="value">{marks}</span>
      </div>
    </div>
  );
}

// Parent component: holds data and renders multiple cards
function App() {
  const students = [
    { id: 1, name: "Vyshnavi",   department: "CSE", marks: 88 },
    { id: 2, name: "Kusuma",  department: "ECE", marks: 92 },
    { id: 3, name: "Vijay ",    department: "IT",  marks: 79 },
    { id: 4, name: "Srinidhi", department: "EEE", marks: 85 }
  ];

  return (
    <div>
      <h1>Student Marks List</h1>

      <div className="cards-container">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

// Render root component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);