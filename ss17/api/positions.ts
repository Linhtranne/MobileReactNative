export async function fetchPositions() {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/positions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
