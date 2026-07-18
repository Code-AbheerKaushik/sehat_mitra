import connectDB from '@/lib/db';
import ChatSession from '@/models/ChatSession';
import User from '@/models/User';

// GET /api/chat?email=...  — fetch chat history for a user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return Response.json({ messages: [] }, { status: 200 });
    }

    await connectDB();

    // Find user by email to get their ObjectId
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return Response.json({ messages: [] }, { status: 200 });
    }

    const session = await ChatSession.findOne({ userId: user._id }).lean();
    return Response.json({ messages: session?.messages || [] }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/chat]', error);
    return Response.json({ error: 'Failed to fetch chat' }, { status: 500 });
  }
}

// POST /api/chat  — save full chat message list
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, messages } = body;

    if (!email) {
      return Response.json({ error: 'email is required' }, { status: 400 });
    }

    await connectDB();

    // Upsert user first (in case they're new)
    const user = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: { email, name: email.split('@')[0] } },
      { upsert: true, new: true }
    );

    // Upsert chat session
    await ChatSession.findOneAndUpdate(
      { userId: user._id },
      { $set: { messages } },
      { upsert: true, new: true }
    );

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/chat]', error);
    return Response.json({ error: 'Failed to save chat' }, { status: 500 });
  }
}

// DELETE /api/chat?email=...  — clear chat history
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return Response.json({ error: 'email is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email }).lean();
    if (user) {
      await ChatSession.findOneAndUpdate(
        { userId: user._id },
        { $set: { messages: [] } }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[DELETE /api/chat]', error);
    return Response.json({ error: 'Failed to clear chat' }, { status: 500 });
  }
}
