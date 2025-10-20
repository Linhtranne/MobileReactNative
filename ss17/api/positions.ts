export async function deletePosition(id: string | number) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete position');
  }
  return response.json();
}
export async function fetchPositionById(id: string | number) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
export async function fetchPositions() {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/positions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getPositionById(id: number | string) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function updatePosition(id: number | string, data: { positionName: string }) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update position');
  }
  return response.json();
}

export async function createPosition(position: { positionName: string }) {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/positions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(position),
  });
  if (!response.ok) {
    throw new Error('Failed to create position');
  }
  return response.json();
}
