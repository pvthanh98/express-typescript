import { User } from "../entity/user.entity";
import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { AUTHENTICATION_ERROR } from "./templates/error/auth-error.template";

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload: any, done: any) {
    const userRepo = await getRepository(User);
    const user = await userRepo.findOne({
      where: {
        id: jwt_payload.sub,
      },
    });
    if (user) return done(null, user);

    return done(null, false);
  })
);

function passport_authenticate_jwt(req: any, res: any, next: any) {
  passport.authenticate("jwt", function (err: any, user: any) {
    if (err) return next(err);
    if (!user)
      return res.status(401).send(AUTHENTICATION_ERROR.NOT_AUTHORIZED);

    req.user = user;
    return next();
  })(req, res, next);
}

export { passport, passport_authenticate_jwt };
