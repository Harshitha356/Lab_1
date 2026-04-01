function Counter() {
  const [count, setCount] = React.useState(0);

  const handleIncrement = () => setCount(c => c + 1);
  const handleDecrement = () => setCount(c => c - 1);

  return (
    <div className="counter-card">
      <div className="counter-title">Simple Counter</div>

      <div className="counter-value">{count}</div>

      <div className="buttons">
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Counter />);