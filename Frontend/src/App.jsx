import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [bulkUsers, setBulkUsers] = useState([
    { name: "", email: "" }
  ]);

  // GET users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  // Add new input row
  const addRow = () => {
    setBulkUsers([...bulkUsers, { name: "", email: "" }]);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedUsers = [...bulkUsers];
    updatedUsers[index][field] = value;
    setBulkUsers(updatedUsers);
  };

  // BULK POST
  const submitBulkUsers = async () => {
    // remove empty rows
    const validUsers = bulkUsers.filter(
      u => u.name.trim() && u.email.trim()
    );

    if (validUsers.length === 0) {
      alert("Enter at least one user");
      return;
    }

    const res = await fetch("http://localhost:3000/users/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(validUsers)
    });

    const data = await res.json();

    alert(`${data.insertedCount} users added`);

    // refresh list
    fetchUsers();

    // reset form
    setBulkUsers([{ name: "", email: "" }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bulk Add Users</h2>

      {bulkUsers.map((user, index) => (
        <div key={index}>
          <input
            placeholder="Name"
            value={user.name}
            onChange={e =>
              handleChange(index, "name", e.target.value)
            }
          />

          <input
            placeholder="Email"
            value={user.email}
            onChange={e =>
              handleChange(index, "email", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addRow}>➕ Add Row</button>
      <br /><br />

      <button onClick={submitBulkUsers}>Submit Bulk Users</button>

      <hr />

      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
