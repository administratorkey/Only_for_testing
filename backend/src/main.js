import app from "./express.js";

app.listen(process.env.PORT ?? 8000, () => {
  console.log("Backend running...");
});
