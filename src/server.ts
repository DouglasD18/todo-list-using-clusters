import app from "./config/app";

app.listen(1234, () => console.log(`Server is started in process ${process.pid}!`));
