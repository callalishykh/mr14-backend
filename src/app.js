import Express, { json } from "express";
import { connectDB } from "./db/config.js";
import dbInit from "./db/init.js";
import authRouter from "./routes/auth/index.js";
import commentRouter from "./routes/post/comment.js";
import postRouter from "./routes/post/index.js";
import userRouter from "./routes/user/index.js";

const app = Express();
connectDB();
dbInit().then(() => console.log("DB synced"));
app.use(json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(authRouter);

app.listen(3304, () => {
  console.log("server started successfully");
});
