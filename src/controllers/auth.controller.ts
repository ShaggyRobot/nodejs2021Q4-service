import typeorm from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import cfg from '../common/config.js';
import User from '../postgresDB/entities/userEntity.js';

const { getConnection } = typeorm;

interface IAuthUser extends RequestGenericInterface {
  Body: { login: string; password: string };
}

export default async function authenticate(req: FastifyRequest<IAuthUser>, rep: FastifyReply): Promise<void> {
  console.log(req.body);
  try {
    const user = await getConnection('myConn')
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.login = :login', { login: req.body.login })
      .getOneOrFail();

    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (same) {
        const token = jwt.sign({ id: user.id, login: user.login }, cfg.JWT_SECRET_KEY as string, {
          expiresIn: '24h',
        });
        rep.code(201).send({ token });
      } else {
        rep.code(401).send({ message: 'Wrong login/password combination.' });
      }
    });
  } catch (error) {
    rep.code(403).send({ message: 'Forbidden.' });
  }

  // try {
  //   const user = await getConnection('myConn')
  //     .getRepository(User)
  //     .createQueryBuilder('user')
  //     .where('user.login = login', { login: req.body.login })
  //     .getOne();

  //   if (user) {
  //     bcrypt.compare(req.body.password, user.password, (err, same) => {
  //       if (same) {
  //         const token = jwt.sign({ id: user.id, login: user.login }, cfg.JWT_SECRET_KEY as string, {
  //           expiresIn: '24h',
  //         });
  //         rep.code(201).send({ token });
  //       } else {
  //         rep.code(401).send({ success: false, message: 'Wrong password.' });
  //       }
  //     });
  //   }
  // } catch (error) {
  //   rep.code(403).send({ success: false, message: 'Can`t find login/password combination in database.' });
  // }
}
