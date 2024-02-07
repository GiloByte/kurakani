import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { LoginPayload } from '../types.js';

export async function loginController(req: Request<any, any, LoginPayload>, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new Error('No user exists with the email.');

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error('Email and password do not match.');

    res.send(user);
  } catch (err) {
    res.status(401).send({ error: true, message: err.message });
  }
}
