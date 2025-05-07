export async function fetchGraphQL(query: string, variables: any = {}) {
  const token = localStorage.getItem("cw-token");

  const res = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await res.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}
