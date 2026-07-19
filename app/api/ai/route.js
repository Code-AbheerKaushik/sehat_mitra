const GEMINI_MODEL = 'gemini-3.5-flash';

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'AI service is not configured' },
      { status: 503 }
    );
  }

  try {
    const { prompt, contents } = await request.json();
    const requestContents = Array.isArray(contents)
      ? contents
      : prompt
        ? [{ parts: [{ text: prompt }] }]
        : null;

    if (!requestContents) {
      return Response.json(
        { error: 'prompt or contents is required' },
        { status: 400 }
      );
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({ contents: requestContents }),
      }
    );

    const result = await geminiResponse.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!geminiResponse.ok || !text) {
      console.error('[POST /api/ai] Gemini error', result);
      return Response.json(
        { error: 'AI service could not generate a response' },
        { status: 502 }
      );
    }

    return Response.json({ text });
  } catch (error) {
    console.error('[POST /api/ai]', error);
    return Response.json(
      { error: 'AI service request failed' },
      { status: 500 }
    );
  }
}
