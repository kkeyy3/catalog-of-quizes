const { error } = require("console")
const express = require("express")
const fs = require("fs")
const { json } = require("stream/consumers")

const app = express()
const port = 3000

app.get("/quizzes", (req, res) => {
    const text = fs.readFileSync("quizzes.json", "utf-8")
    const quizzes = JSON.parse(text)
    res.status(200).json(quizzes)
})

app.get("/quizzes/:id", (req, res) => {
    const id = Number(req.params.id)
    const text = fs.readFileSync("quizzes.json", "utf-8")
    const quizzes = JSON.parse(text)
    const quiz = quizzes.find(quiz => quiz.id === id)
    if (!quiz)return res.status(404).json({error : "Квиз не найден"}); 
    else res.status(200).json(quiz)
})



app.listen(port, () => {
    console.log("Сервер запущен: http://localhost:" + port)
})

