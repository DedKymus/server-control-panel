import express from 'express';
import * as http from 'http';

const app = express();
app.use(express.json());

const server = http.createServer(app);
const port = 8080

app.post('/api/register', (req, res) => {
    const data = req.body;
    console.log("registration:", data);

    res.json({
        status: 200,
        msg: "register successfully",
    })
})

server.listen(port,() => {
   console.log(`server listening on ${port}`);
});

