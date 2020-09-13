import { Jose, makeJwt, Payload, setExpiration } from "./deps.ts";

export const key = "kwoinkwoin";
function payload(username: string): Payload {
  return {
    iss: username,
    exp: setExpiration(60),
  }
}
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export async function login(context: any) {
  const { username, password } = await context.request.body().value;
  if(username === "admin" && password === "admin") {
    context.response.body = await makeJwt({ header, payload: payload(username), key });
  } else {
    context.response.status = 401;
  }
}
