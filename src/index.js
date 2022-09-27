import app from "./app"
import db from "./db/index";

const port = app.get("port")
app.listen(port,()=>{
    console.log(`server listen on port ${port}`);
})