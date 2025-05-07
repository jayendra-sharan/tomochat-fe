
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGraphQL(query: string, variables?: object) {
  const token = localStorage.getItem("cw-token");

  const res = await fetch(`${apiUrl}/graphql`, {
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
