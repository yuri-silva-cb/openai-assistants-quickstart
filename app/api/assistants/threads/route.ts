import { openai } from "@/app/openai";
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';


export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const threadId = uuidv4();
    // Opções a considerar: salvar threadId em um banco de dados, se necessário
    res.status(200).json({ threadId });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const runtime = "nodejs";

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
