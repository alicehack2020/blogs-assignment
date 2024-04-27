import express, { Request, Response } from "express"
import { blogController } from "../controller/blogsController"

const router = express.Router()

const blog = new blogController()
router.post("/blogs/create", (req, res) => blog.add(req, res))
router.get("/blogs/:id", (req, res) => blog.find(req, res))

export default router
