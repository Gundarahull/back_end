import { Router } from 'express'

import { Todo } from '../models/todo'
type RequestBody ={text:string}
type RequestParams={todoId: string}

let todos: Todo[] = []
const router = Router()

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos })

})

router.post('/todo', (req, res, next) => {
    const body=req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

router.put('/todo/:todoId', (req, res, next) => {
   const params=req.params as RequestParams; 
   const tid=params.todoId;
    const body=req.body as RequestBody
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        res.status(201).send('updated')
    } else {
        return next(Error("No such Todo found"))
    }
});

router.delete("/todo/:todoId", (req, res, next) => {
    const params=req.params as RequestParams; 
    todos=todos.filter(todoItem=>todoItem.id!==params.todoId)
    res.status(200).send(`Deleted the todo with id ${req.params.todoId}`)
})


export default router