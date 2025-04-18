import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://course-kv4j.vercel.app/" // the base url of your auth server
})

