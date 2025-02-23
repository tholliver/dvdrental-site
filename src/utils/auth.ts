import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";
import * as schema from '@/server/db/schemas/auth-schema'
export const auth = betterAuth({
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "user",
                input: false
            }
        }
    },
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema
        },
        usePlural: true
    }),
});