export const dynamic = 'force-static'

export async function GET() {
  try {
    const response = await fetch('https://api.ons.gov.uk/timeseries/ABMI/data');
    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
} 