import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          // {
          //   role: "system",
          //   content:
          //     "You are a professional testimonial writer. Create authentic, specific testimonials that highlight transformation and results. Keep them concise but impactful. Just use data that you've got.",
          // },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate draft")
    }

    const data = await response.json()
    const draft = data.choices[0]?.message?.content || ""

    return NextResponse.json({ draft })
  } catch (error) {
    console.error("Error generating draft:", error)
    return NextResponse.json({ error: "Failed to generate draft" }, { status: 500 })
  }
}
