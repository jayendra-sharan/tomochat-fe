// app/create-chat/page.tsx

"use client";

import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { useState } from "react";

export default function CreateChatPage() {
  const [name, setName] = useState("");
  const [groupType, setGroupType] = useState("Private");
  const [topic, setTopic] = useState("Learn_Dutch");
  const [error, setError] = useState("");
  const [groupDetail, setGroupDetail] = useState({
    id: "",
    name: "",
    groupType: "",
    topic: "",
    inviteLink: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await fetchGraphQL(`
      mutation CreateGroup($input: CreateGroupInput!) {
        createGroup(input: $input) {
          id
          name
          groupType
          topic
          inviteLink
          createdAt
          updatedAt
        }
      }
    `, {
      input: {
        name,
        groupType,
        topic,
      }
    })

    if (result.errors) {
      setError(result.errors[0].message);
    } else {
      setGroupDetail(result.createGroup)
      console.log('success', result);
    }
  };

  if (groupDetail.id) {
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-6">Grop created successfully.</h1>
        <p>{`Group name: ${groupDetail.name}`}</p>
        <p>{groupDetail.inviteLink}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">Create Chat</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Group Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Type</label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Private">Private</option>
            <option value="Group">Group</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Language to Learn</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Dutch">Dutch</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
