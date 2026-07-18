import connectDB from '@/lib/db';
import Hospital from '@/models/Hospital';

// GET /api/hospitals  — fetch all hospitals
export async function GET() {
  try {
    await connectDB();
    const hospitals = await Hospital.find({}).sort({ name: 1 }).lean();
    return Response.json({ hospitals }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/hospitals]', error);
    return Response.json({ error: 'Failed to fetch hospitals' }, { status: 500 });
  }
}
