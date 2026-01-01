import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div style={{ padding: 18 }}>
      <h2>👤 Users List (API Example)</h2>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>

      <button onClick={fetchUsers}>🔄 Refresh</button>
    </div>
  );
}
