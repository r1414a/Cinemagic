import { Groq } from "groq-sdk";
import dotenv from 'dotenv'
dotenv.config();

const groq = new Groq({apiKey: process.env.GROQAI_API_KEY});

export const getMovie = async () => {
     const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: 'You are a financial assistant. Classify the following transaction description into one of these spending categories: Family & pets, Groceries, ATM, Bills & utilities, Charity, Commute, Credit bills, EMIs & Loans, Edge card bill, Education, Entertainment, Fees & charges, Finance, Fitness, Food & drinks, Fuel, Household, Insurance, Medical, Miscellaneous, Money transfers, Personal care, Rent, Shopping, Travel, Wallets and Others. Return only the category name.'
      },
      { role: "user", content: "1500rs silver chain'" }
    ],
    // response_format: { type: "json_object" }
     });

  console.log(response.choices[0].message);
}

