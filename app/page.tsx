"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]);

  function listPosts() {
    client.models.Post.observeQuery().subscribe({
      next: (data) => setPosts([...data.items]),
    });
  }

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <main>
      <h1>My posts</h1>
      <ul>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.author.name}</p>
            <p>{post.publishDate}</p>
          </div>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
