function StudentProfile() {
  const student = {
    name: "Guddeti Harshitha",
    department: "Computer Science",
    year: "3rd Year",
    section: "A"
  };

  return (
    <div className="profile-card">
      <p className="student-name">{student.name}</p>

      <div className="detail-row">
        <span className="label">Department:</span>
        <span className="value">{student.department}</span>
      </div>

      <div className="detail-row">
        <span className="label">Year:</span>
        <span className="value">{student.year}</span>
      </div>

      <div className="detail-row">
        <span className="label">Section:</span>
        <span className="value">{student.section}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentProfile />
    </div>
  );
}

// Use the global ReactDOM from CDN
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);