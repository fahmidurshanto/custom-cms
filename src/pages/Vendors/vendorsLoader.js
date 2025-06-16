export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/vendors');
  if (!response.ok) {
    throw new Error('Failed to fetch vendors');
  }
  return response.json();
}
