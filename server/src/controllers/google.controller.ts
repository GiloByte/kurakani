import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { googleVerify } from '../services/google.service.js';
import { GoogleAuthPayload } from '../types.js';

export async function googleAuthController(req: Request<any, any, GoogleAuthPayload>, res: Response) {
  try {
    const { credential } = req.body;

    const userProfile = await googleVerify(credential);

    const userFromDB = await prisma.user.findFirst({ where: { email: userProfile.email } });
    // Register flow
    if (!userFromDB) {
      // TODO: generate an unique username
      const user = await prisma.user.create({
        data: {
          username: '',
          email: userProfile.email,
          credits: 0,
          exp: 0,
          token: credential,
        },
      });

      res.json(user);
      return;
    }

    // Login Flow
    res.json(userFromDB);
    return;
  } catch (err) {
    res.status(401).send({ error: true, message: err.message });
  }
}
