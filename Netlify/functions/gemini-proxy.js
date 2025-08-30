const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
    try {
        const { prompt, isJson } = JSON.parse(event.body);
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

        const requestPayload = {
            contents: [{ parts: [{ text: prompt.userQuery }] }],
            systemInstruction: { parts: [{ text: prompt.systemPrompt }] }
        };

        if (isJson) {
            requestPayload.generationConfig = {
                responseMimeType: "application/json",
                responseSchema: prompt.responseSchema,
                propertyOrdering: prompt.propertyOrdering
            };
        }

        const result = await model.generateContent(requestPayload);
        const responseText = result.response.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ response: responseText })
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to communicate with the Gemini API." })
        };
    }
};
