import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    console.error("inside the api create"); // Log the error for debugging purposes

    try {
        const { title, content } = req.body;

        const session = await getSession({ req });
  
      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: { connect: { email: session?.user?.email } },
        },
      });
      res.json(result);
    } catch (error) {
      console.error("error:", error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }