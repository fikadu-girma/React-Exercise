import { useState } from "react";

interface Post {
  title: string;
  body: string;
  userId: number;
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newPost: Post = {
      title,
      body,
      userId: 1,
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setMessage("✅ Post created successfully!");
      setTitle("");
      setBody("");
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Something went wrong"));
    }
  }

  return (
    <div style={{ padding: 18 }}>
      <h2>📝 Create Post (API Example)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="Post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        /><br /><br />

        <button type="submit">📤 Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
