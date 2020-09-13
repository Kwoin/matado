import router from './routes.ts'
import { Application, jwtMiddleware, Middleware, OnSuccessHandler } from "./deps.ts";
import { key } from "./login-controller.ts";

const HOST = '127.0.0.1'
const PORT = 4300
const ignorePatterns = ["/login"]

const onSuccess: OnSuccessHandler = (ctx, token) => {
  ctx.state.userId = token
}

const app = new Application();
app.use(jwtMiddleware<Middleware>({key, ignorePatterns, onSuccess, algorithm: "HS256"}))

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT} ...`)
await app.listen(`${HOST}:${PORT}`)


