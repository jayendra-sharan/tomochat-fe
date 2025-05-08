"use client";

import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserDataDispatch } from "../context/UserContext";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const dispatch = useUserDataDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    // Call your GraphQL mutation here
    const result = await fetchGraphQL(`
    query Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
          email
          displayName
        }
      }
    }`, {
      input: {
        email,
        password,
      }
    });

    if (result.errors) {
      setError(result.errors[0].message);
    } else {
      console.log('success', result);
      localStorage.setItem("cw-token", result.login.token)
      dispatch({
        type: "SET_USER",
        payload: {
          displayName: result.login.user.displayName,
          id: result.login.user.id,
          email: result.login.user.email,
        }
      });

      router.push("/dashboard");

    }
  };

  return (
    <div  className="flex flex-col flex-1 items-center justify-center mx-4" >
      <form className="md:w-1/2" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full my-1"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full my-1"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="bg-blue-500 hover:bg-blue-300 p-2 my-2 rounded-lg w-full" type="submit">Login</button>
      </form>

      <div className="mt-10">
        <Link href="/signup">New user? Click here</Link>
      </div>
    </div>
  );
}
