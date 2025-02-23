import type { auth } from "@/utils/auth"
import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
import { inferAdditionalFields } from "better-auth/client/plugins";


export const { signIn, signUp, useSession, ...authClient } = createAuthClient({
    //you can pass client configuration here
    plugins: [inferAdditionalFields<typeof auth>()]
})
