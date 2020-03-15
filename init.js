import "./db";
import "./models/Video";
import "./models/Comment";
import app from "./app";

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
