export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/employees');
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
}
