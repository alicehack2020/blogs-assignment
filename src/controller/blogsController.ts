import { Request, Response } from "express"

let data: any = []

export class blogController {
    add(req: Request, res: Response) {
        const { title, content } = req.body
        if (!title || !content) {
            res.status(401).send()
        } else if (content.length < 4 || content.length > 300) {
            res.status(401).send()
        } else if (title.length < 4 || title.length > 100) {
            res.status(401).send()
        }
        data.push({ id: data.length, title: title, content: content })
        res.status(201).send(data[data.length - 1])
    }
    find(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            res.status(401).send()
        }

        const blog = data.filter(
            (blog: { id: number; title: string; content: string }) =>
                blog.id === Number(id)
        )

        res.status(201).send(blog[0])
    }
}
