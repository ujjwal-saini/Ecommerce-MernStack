import fetch from "node-fetch";

export const aiChatProduct = async (req, res) => {
    try {
        const { message, product } = req.body;
        if (!message || !product) {
            return res.status(400).json({ error: "Missing data" });
        }

        const prompt = `
You are a friendly and smart AI shopping assistant for an eCommerce website.

Your behavior:
- Talk like a real human (casual, helpful, friendly)
- If user says "hi", "hello", introduce yourself
- If user asks about you → answer normally
- If user asks about product → answer based on product info
- Keep answers short, natural, and helpful
- Do NOT always use bullet points unless needed

Product Info:
Name: ${product.name}
Description: ${product.description}

User Message:
${message}

Now reply like a real human assistant:
`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3.1",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            }),
        });

        const data = await response.json();
        
        const reply =
            data?.choices?.[0]?.message?.content ||
            "AI not responding";

        res.json({ reply });

    } catch (error) {
        console.log("AI ERROR:", error);
        res.status(500).json({ error: "AI error" });
    }
};