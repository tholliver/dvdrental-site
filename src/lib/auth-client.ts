import type { auth } from "@/utils/auth"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";

export const { signIn, signOut, signUp, useSession, ...authClient } = createAuthClient({
    //you can pass client configuration here
    plugins: [inferAdditionalFields<typeof auth>()]
})

export function getNavLinks(role: string) {
    const links = [
        { href: "/films", label: "Films" },
    ]

    // if (role === "customer") {
    //     links.push(...[{ href: "/customers", label: "Customers" },
    //     { href: "/dashboard", label: "Dashboard" }
    //     ])
    // }

    // if (role === "admin") {
    //     links.push(...[{ href: "/customers", label: "Customers" },
    //     { href: "/dashboard", label: "Dashboard" }
    //     ])
    // }

    links.push(...[{ href: "/customers", label: "Customers" },
        // { href: "/dashboard", label: "Dashboard" }
    ])
    return links
}

export type AuthSession = typeof authClient.$Infer.Session
export type AuthUserSession = typeof authClient.$Infer.Session.user
