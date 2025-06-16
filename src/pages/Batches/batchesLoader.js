export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/batches');
  if (!response.ok) {
    throw new Error('Failed to fetch batches');
  }
  return response.json();
}
