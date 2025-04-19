import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://course-production-10d3.up.railway.app/" // the base url of your auth server
})

