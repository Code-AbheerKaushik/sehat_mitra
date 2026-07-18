import connectDB from '@/lib/db';
import User from '@/models/User';

// GET /api/user?email=...  — fetch profile
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const googleId = searchParams.get('googleId');

    if (!email && !googleId) {
      return Response.json({ error: 'email or googleId required' }, { status: 400 });
    }

    await connectDB();
    const query = googleId ? { googleId } : { email };
    const user = await User.findOne(query).lean();

    if (!user) {
      return Response.json({ user: null }, { status: 200 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/user]', error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// POST /api/user  — create or update profile (upsert)
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, googleId, name, age, bloodGroup, allergies, chronicConditions, dietPreference, language, darkMode } = body;

    if (!email) {
      return Response.json({ error: 'email is required' }, { status: 400 });
    }

    await connectDB();

    const updateData = {
      ...(name !== undefined && { name }),
      ...(age !== undefined && { age }),
      ...(bloodGroup !== undefined && { bloodGroup }),
      ...(allergies !== undefined && { allergies }),
      ...(chronicConditions !== undefined && { chronicConditions }),
      ...(dietPreference !== undefined && { dietPreference }),
      ...(language !== undefined && { language }),
      ...(darkMode !== undefined && { darkMode }),
      ...(googleId && { googleId }),
    };

    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    ).lean();

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/user]', error);
    return Response.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
