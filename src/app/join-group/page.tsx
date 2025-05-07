"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchGraphQL } from "@/lib/fetchGraphQL";

export default function JoinGroupPage() {
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteLink) {
      setError("Please enter invite link");
      return;
    }

    try {
      const result = await fetchGraphQL(`
        mutation JoinGroupByInviteLink($input: JoinGroupByInviteLinkInput!) {
          joinGroupByInviteLink(input: $input) {
            id
            name
          }
        }
      `, {
        input: { inviteLink }
      });

      if (result.errors) {
        setError(result.errors[0].message);
        console.log("error");
      }

      router.push("/dashboard");
    } catch (err) {
      console.log("Error in joining group", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Join Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Invite Link</label>
          <input
            type="text"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter invite link"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Join Group
        </button>
      </form>
    </div>
  );
}
