import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://courseai.netlify.app/" // the base url of your auth server
})

