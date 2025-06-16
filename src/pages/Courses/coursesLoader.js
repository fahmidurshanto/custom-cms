export async function loader() {
  const response = await fetch('https://custom-cms-backend.vercel.app/courses');
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}
