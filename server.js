const { error } = require("console")
const express = require("express")
const fs = require("fs")
const { json } = require("stream/consumers")

const app = express()
const port = 3000

function readQuizzes() {
    const text = fs.readFileSync("quizzes.json", "utf-8")
    return quizzes = JSON.parse(text)
}


app.get("/quizzes", (req, res) => {
    const quizzes = readQuizzes()
    res.status(200).json(quizzes)
})

app.get("/quizzes/:id", (req, res) => {
    const id = Number(req.params.id)
    const quizzes = readQuizzes()
    const quiz = quizzes.find(q => q.id === id)
    if (!quiz)  res.status(404).json({error : "Квиз не найден"}); 
    else res.status(200).json(quiz)
})



app.listen(port, () => {
    console.log("Сервер запущен: http://localhost:" + port)
})

