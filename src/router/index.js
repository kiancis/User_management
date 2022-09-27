import userRouter from "../controller/userController"
import taskRouter from "../controller/taskController"

export default (app) =>{
    app.use("/user", userRouter)
    app.use("/task", taskRouter)
}
 
