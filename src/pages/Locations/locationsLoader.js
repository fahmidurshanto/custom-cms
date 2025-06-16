export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/locations');
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}
