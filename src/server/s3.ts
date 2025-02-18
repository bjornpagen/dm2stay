import "server-only"

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createId } from "@paralleldrive/cuid2"
import { file as fileTable } from "@/server/db/schema"
import type { db as DbClient } from "@/server/db"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream/promises"
import type { Readable } from "node:stream"

// TODO(bjornpagen): Move to env.js. We haven't done this because we're not even using S3 yet.
if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_S3_BUCKET_NAME
) {
  throw new Error(
    "AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET_NAME must be set"
  )
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

/**
 * Uploads a file to S3 and returns the public URL
 * @param file The file to upload
 * @param maxSizeInBytes Optional maximum file size in bytes (default: 5MB). Set to 0 to disable size validation
 * @throws {Error} When file size exceeds maxSizeInBytes (if validation is enabled)
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export async function uploadToS3(
  file: File,
  maxSizeInBytes: number = 500 * 1024 * 1024
): Promise<string> {
  if (maxSizeInBytes > 0 && file.size > maxSizeInBytes) {
    throw new Error(`File size exceeds limit of ${maxSizeInBytes} bytes`)
  }

  const key = createId()

  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: uint8Array,
    ContentType: file.type,
    ACL: "public-read"
  })

  await s3Client.send(command)

  return key
}

export async function getPresignedUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  })

  return getSignedUrl(s3Client, command, { expiresIn })
}

export async function uploadFileToS3AndSave(
  db: typeof DbClient,
  file: File
): Promise<string> {
  const fileId = await uploadToS3(file)

  await db.insert(fileTable).values({
    id: fileId,
    name: file.name,
    size: file.size,
    type: file.type
  })

  return fileId
}

export async function downloadFromS3(key: string, localPath: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  })

  const response = await s3Client.send(command)
  if (!response.Body) {
    throw new Error(`No body in response for key ${key}`)
  }

  const writeStream = createWriteStream(localPath)
  await pipeline(response.Body as Readable, writeStream)
}
