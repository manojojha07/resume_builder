import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnected from './src/config/db.config.js'
import userRouter from './src/routes/user.route.js'
import resumeRouter from './src/routes/resume.route.js'
import aiRouter from './src/routes/aiRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "https://resumebuilder-mu-ecru.vercel.app",
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'], // array में uppercase method names
}));



dbConnected();

app.get('/' , (req , res) => {
    res.send("Namste Duniya Kaise Hoo ");
});

app.use('/api/auth' , userRouter);
app.use("/api/resumes" , resumeRouter);
app.use("/api/ai", aiRouter)

app.listen(PORT , () => {
    console.log(`server is running : http://localhost:${PORT} `)
})
