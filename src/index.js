import app from "./app"

const port = app.get("port")
app.listen(port,()=>{
    console.log(`server listen on port ${port}`);
})