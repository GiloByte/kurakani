import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { RegisterPayload } from '../types.js';

export async function registerController(req: Request<any, any, RegisterPayload>, res: Response) {
  try {
    const { username, email, password } = req.body;

    const user1 = await prisma.user.findFirst({ where: { username } });
    if (user1) {
      throw new Error('User with the username already exists.');
    }

    const user2 = await prisma.user.findFirst({ where: { email } });
    if (user2) {
      throw new Error('User with the email already exists.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        credits: 0,
        exp: 0,
        password: hashedPassword,
        token: '',
      },
    });

    res.json(user);
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
}
