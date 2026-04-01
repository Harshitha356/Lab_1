function UserForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = React.useState("");

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Please enter your name";

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!password) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess("");

    if (!validate()) return;

    setSuccess("User registered successfully!");

    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="form-wrapper">
      <h2>User Registration</h2>

      {success && <div className="success-text">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="field-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="field-row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
          />
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserForm />);