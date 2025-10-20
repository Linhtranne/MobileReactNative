// Product APIs
export async function fetchProducts() {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/products');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function fetchProductById(id: any) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/products/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

// Cart APIs
export async function fetchCart() {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/cart');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function addToCart(productId: any, quantity = 1) {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
}

export async function updateCartItem(id: any, quantity: any) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/cart/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
}

export async function deleteCartItem(id: any) {
  const response = await fetch(`https://nest-api-public.ixe-agent.io.vn/api/v1/cart/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete cart item');
  return response.json();
}

export async function clearCart() {
  const response = await fetch('https://nest-api-public.ixe-agent.io.vn/api/v1/cart', {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to clear cart');
  return response.json();
}
