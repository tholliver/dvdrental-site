import { toNodeHandler } from "better-auth/node"
import { auth } from "@/utils/auth"

// Disallow body parsing, we will parse it manually
export const config = { api: { bodyParser: false } }

export default toNodeHandler(auth.handler)