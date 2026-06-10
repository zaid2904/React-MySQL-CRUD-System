import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  // GET USERS

  const fetchUsers = async () => {
    try {
      const res = await API.get("/");

      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE USER

  const addUser = async () => {
    if (!name || !email) return;

    try {
      await API.post("/", {
        name,
        email,
      });

      setName("");
      setEmail("");

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE USER

  const deleteUser = async (id) => {
    try {
      await API.delete(`/${id}`);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT USER

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // UPDATE USER

  const updateUser = async () => {
    try {
      await API.put(`/${editId}`, {
        name,
        email,
      });

      setEditId(null);

      setName("");
      setEmail("");

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
      }}
    >
      <h1>User CRUD App</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editId ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}

      <hr />

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <button onClick={() => handleEdit(user)}>Edit</button>

          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
