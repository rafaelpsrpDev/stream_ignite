import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js';

const server = http.createServer( async (req, res) => {

    const { url, method } = req

    await json(req, res)


    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParam = req.url.match(route.path)

        

        req.params = routeParam.groups

        return route.handler(req, res)
    }


   return res.writeHead(404).end();
})

server.listen(3334)