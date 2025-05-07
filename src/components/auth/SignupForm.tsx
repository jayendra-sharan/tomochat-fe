"use client";

import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    // Call your GraphQL mutation here
    const res = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              id
              email
              displayName
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          input: {
            email,
            displayName,
            password,
            userType: "human"
          }
        },
      }),
    });

    const result = await res.json();

    if (result.errors) {
      setError(result.errors[0].message);
    } else {
      alert("User created successfully. Please login.");
      window.location.href = "/login";
    }
  };

  return (
    <div  className="flex flex-col flex-1 items-center justify-center mx-4" >
      <form className="md:w-1/2" onSubmit={handleSubmit}>
        <input
          className="border p-2 my-1 w-full"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 my-1 w-full"
          placeholder="Display Name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
        />
        <input
          className="border p-2 my-1 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          className="border p-2 my-1 w-full"
          placeholder="Retype Password"
          type="password"
          value={retypePassword}
          onChange={e => setRetypePassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="bg-blue-500 hover:bg-blue-300 p-2 my-1 my-2 rounded-lg w-full" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
