import "server-only"

import OpenAI from "openai"
import { env } from "@/env"

export const OPENAI_DEFAULT_MODEL = "gpt-4o"
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})
