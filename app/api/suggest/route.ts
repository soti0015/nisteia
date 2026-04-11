import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { day, rules, ingredients } = await req.json()

  const prompt = `Orthodox fasting today is ${day}. Rules: ${rules}. The person likes: ${ingredients.join(', ')}. Suggest 3 fasting-friendly meal ideas using their preferred ingredients. Return ONLY a JSON array like this: [{"name":"...","desc":"...","emoji":"..."}]`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    console.log('Claude response:', JSON.stringify(data))

    const text = data.content?.[0]?.text || '[]'
    const clean = text.replace(/```json|```/g, '').trim()
    const suggestions = JSON.parse(clean)

    return NextResponse.json({ suggestions })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ suggestions: [] }, { status: 500 })
  }
}