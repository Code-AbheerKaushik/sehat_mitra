import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return Response.json({ status: 'Connected to MongoDB successfully!', db: 'sehatmitra' });
  } catch (error) {
    return Response.json({ status: 'Connection failed', error: error.message }, { status: 500 });
  }
}
