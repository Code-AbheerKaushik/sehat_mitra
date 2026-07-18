import connectDB from '@/lib/db';
import OutbreakAlert from '@/models/OutbreakAlert';

// GET /api/alerts  — fetch all active outbreak alerts
export async function GET() {
  try {
    await connectDB();
    const alerts = await OutbreakAlert.find({ isActive: true })
      .sort({ reportedAt: -1 })
      .lean();

    return Response.json({ alerts }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/alerts]', error);
    return Response.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}
