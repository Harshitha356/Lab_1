function ItemListApp() {
  // items array in state
  const [items, setItems] = React.useState([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Study React" }
  ]);
  const [newItem, setNewItem] = React.useState("");
  const [nextId, setNextId] = React.useState(3); // for unique keys [web:59][web:66]

  const handleAddItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;

    const itemToAdd = { id: nextId, text: trimmed };
    setItems(prev => [...prev, itemToAdd]); // add item to array state [web:59][web:60]
    setNextId(id => id + 1);
    setNewItem("");
  };

  const handleRemoveItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id)); // remove by id [web:60][web:62][web:65]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem();
  };

  return (
    <div className="container">
      <h2>Task List</h2>

      {/* input logic */}
      <form className="controls" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* display logic */}
      {items.length === 0 ? (       
        <div className="empty-text">No items in the list.</div>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ItemListApp />);