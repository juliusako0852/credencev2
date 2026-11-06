const API_KEY = "AQ.Ab8RN6INiZm8JrKuC13pEwv0dH1sqbvOQJUIxknLUew2XTq1hw";

const MODEL = "gemini-3.6-flash";

export interface FinancialInsights {
  summary: string;
  income_analysis: string;
  expense_analysis: string;
  forecast_analysis: string;
  financial_risks: string[];
  recommendations: string[];
}

export interface FinancialData {
  income: number[];
  expenses: number[];
  distributed_income: number[];
  distributed_expenses: number[];
  income_forecast: number[];
  expense_forecast: number[];
}

export async function analyzeFinances(
  data: FinancialData
): Promise<FinancialInsights> {
  const prompt = `
You are Credence AI, a personal financial analysis assistant.

Analyze the following financial information.

All monetary values are in Philippine pesos (PHP).

ORIGINAL INCOME:
${JSON.stringify(data.income)}

ORIGINAL EXPENSES:
${JSON.stringify(data.expenses)}

DISTRIBUTED INCOME:
${JSON.stringify(data.distributed_income)}

DISTRIBUTED EXPENSES:
${JSON.stringify(data.distributed_expenses)}

NEXT 3-DAY INCOME SMA FORECAST:
${JSON.stringify(data.income_forecast)}

NEXT 3-DAY EXPENSE SMA FORECAST:
${JSON.stringify(data.expense_forecast)}

IMPORTANT INSTRUCTIONS:

1. Analyze the provided data without recalculating the SMA.
2. Interpret the income and expense trends.
3. Compare the predicted income and expenses.
4. Identify potential financial risks.
5. Evaluate the user's financial situation.
6. Provide practical recommendations.
7. Do not invent missing information.
8. Avoid claiming that a prediction is guaranteed.

Return valid JSON using this structure:

{
  "summary": "Overall financial assessment",
  "income_analysis": "Income trend analysis",
  "expense_analysis": "Expense trend analysis",
  "forecast_analysis": "Three-day forecast interpretation",
  "financial_risks": [
    "Potential financial risk"
  ],
  "recommendations": [
    "Practical recommendation"
  ]
}
`;

  if (!API_KEY) {
    throw new Error("Gemini API key is missing.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Gemini API request failed.");
  }

  const result = await response.json();

  const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!generatedText) {
    throw new Error("No AI response was generated.");
  }

  return JSON.parse(generatedText) as FinancialInsights;
}
