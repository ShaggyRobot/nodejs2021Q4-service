import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import cfg from '../common/config.js';

const unguardedPaths = ['/login'];

async function authGuard(req: FastifyRequest, rep: FastifyReply): Promise<void> {
  if (!unguardedPaths.includes(req.url)) {
    try {
      if (!req.headers.authorization) {
        rep.code(401).send({ message: 'Not authorized.' });
      } else {
        const token = req.headers.authorization.split(' ')[1];
        if (!token || !jwt.verify(token, cfg.JWT_SECRET_KEY as string)) {
          rep.code(401).send({ message: 'Not authorized.' });
        }
      }
    } catch (error) {
      rep.code(401).send({ message: 'Not authorized.' });
    }
  }
}

export default authGuard;
