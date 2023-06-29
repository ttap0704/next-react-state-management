import {SignJWT, jwtVerify, JWTPayload} from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function sign(payload: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = new Date().getTime() + 1000 * 60 * 60;

  return new SignJWT({payload})
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verify(token: string): Promise<JWTPayload> {
  const {payload} = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  return payload;
}
