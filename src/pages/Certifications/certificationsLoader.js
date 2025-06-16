export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/certifications');
  if (!response.ok) {
    throw new Error('Failed to fetch certifications');
  }
  return response.json();
}
