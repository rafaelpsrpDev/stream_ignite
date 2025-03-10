import { DatabaseCSV } from "./databaseCSV.js";
import { randomUUID } from "node:crypto";
import { routeRegex } from "./utils/route-regex.js";

const database = new DatabaseCSV()

export const routes = [
    {
        method: 'GET',
        path: routeRegex('/tasks'),
        handler: async (req, res) => {
            
            let tasks = database.select('tasks')


            return res.end(JSON.stringify(tasks))
            
        }
    },
    {
        method: 'POST',
        path: routeRegex('/tasks'),
        handler: async (req, res) => {
            
            const { title, description, completed_at, created_at, updated_at  } = req.body

            if (!title || !description) {
                res.statusCode = 400
                return res.end(JSON.stringify({ error: 'title and description are required' }))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: completed_at || null,
                created_at: created_at || new Date().getTime(),
                updated_at: updated_at || new Date().getTime()
            }

            database.insert('tasks', task)

            return res.end(JSON.stringify(task))
        }
    },
    {
        method: 'GET',
        path: routeRegex('/tasks/:id'),
        handler: async (req, res) => {
            
            const { id } = req.params
        
            const tasks = database.selectOne('tasks', id)

            return res.end(JSON.stringify(tasks))

        }
    },
    {
        method: 'PUT',
        path: routeRegex('/tasks/:id'),
        handler: async (req, res) => {

            const { id } = req.params
            const { title, description, completed_at, created_at, updated_at } = req.body

            const reqBody = req.body

            if (!title || !description) {
                res.statusCode = 400
                return res.end(JSON.stringify({ error: 'title and description are required' }))
            } else {
                const task = database.update('tasks', id,  {
                    ...reqBody,
                    completed_at: completed_at || null,
                    created_at: created_at || null,
                    updated_at: updated_at || new Date()

                })
                res.statusCode = 201
                return res.end(JSON.stringify({
                    mensagem: "Task updated",
                    task: task
                }))
            }
        }
    }
]