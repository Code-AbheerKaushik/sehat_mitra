import connectDB from '@/lib/db';
import AshaWorker from '@/models/AshaWorker';

// GET /api/asha-workers?village=...  — fetch ASHA workers, optionally filtered by village
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const village = searchParams.get('village');

    await connectDB();

    const query = village
      ? { village: { $regex: village, $options: 'i' } }
      : {};

    const workers = await AshaWorker.find(query).sort({ village: 1 }).lean();
    return Response.json({ workers }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/asha-workers]', error);
    return Response.json({ error: 'Failed to fetch ASHA workers' }, { status: 500 });
  }
}
