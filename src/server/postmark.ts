import "server-only"

import { ServerClient } from "postmark"
import { env } from "@/env"

export const postmark = new ServerClient(env.POSTMARK_API_KEY)
