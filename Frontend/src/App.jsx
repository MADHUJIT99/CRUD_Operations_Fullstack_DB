import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name || !email) {
      alert("Name and Email required");
      return;
    }

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    const newUser = await res.json();

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <h2>Add User</h2>

      <div className="form-group">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <button className="primary" onClick={addUser}>
        Add User
      </button>

      <div className="user-list">
        <h2>User List</h2>

        {users.map(user => (
          <div className="user-item" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <div style={{ fontSize: "14px", color: "#666" }}>
                {user.email}
              </div>
            </div>

            <button className="danger">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
