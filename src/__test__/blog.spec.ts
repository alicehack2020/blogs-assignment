import request from "supertest"
import app from "../app"

describe("post /posts/create", () => {
    describe("create post", () => {
        it("should return status 201", async () => {
            const data = {
                title: "This is sample title",
                content: "This is sample post",
            }
            const response = await request(app)
                .post("/api/blogs/create")
                .send(data)
            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("id")
        })
        it("title field should present", async () => {
            const data = {
                content: "This is sample post",
            }

            const response = await request(app)
                .post("/api/blogs/create")
                .send(data)
            expect(response.statusCode).toBe(401)
        })
        it("content field should present", async () => {
            const data = {
                title: "welcome",
            }

            const response = await request(app)
                .post("/api/blogs/create")
                .send(data)
            expect(response.statusCode).toBe(401)
        })
        it("should return post detail when podt id it pass", async () => {
            const data = {
                title: "welcome title",
                content: "This is post content",
            }
            const response = await request(app)
                .post("/api/blogs/create")
                .send(data)
            expect(response.body).toHaveProperty("id")

            const { id } = response.body

            const response2 = await request(app).get(`/api/blogs/${id}`)
            expect(response2.body).toEqual({ ...data, id: id })
        })

        it("title should not too log or too small", async () => {
            const data = {
                title: "Thi",
                content: "Thi ",
            }
            const response = await request(app)
                .post("/api/blogs/create")
                .send(data)
            expect(response.statusCode).toBe(401)

            const data2 = {
                title: "Lor e m4 5435345 fgg ggg gg ggg g ggggg ggggg  ggg gg g gg gg gggg ggggg gggggg  gggggg gggggggg  ggggggg ggggggggg ggggggggggggg ggggg gggggggggg g ggggg ggggg gggggggg Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, fermentum nunc nec, ultricies nunc Lored;ld;lfg;ldfgldkglkdlgk;dlfkgldfgkd;flkg;ldkfgl;dfl;kg",
                content: "Thi",
            }
            const response2 = await request(app)
                .post("/api/blogs/create")
                .send(data2)
            expect(response2.statusCode).toBe(401)
        })
    })
})
