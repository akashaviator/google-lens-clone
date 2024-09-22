import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function POST(req) {
  try {
    const formData = await req.formData()
    const fileSize = formData.get("fileSize")
    const fileType = formData.get("fileType")
    const clientFileName = formData.get("fileName")

    if (!fileSize || !fileType) {
      return NextResponse.json(
        { status: "fail", error: "File size and type are required" },
        { status: 400 }
      )
    }

    let fileName
    if (clientFileName) {
      fileName = clientFileName
    } else {
      fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      ContentLength: fileSize,
    }

    const command = new PutObjectCommand(params)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    return NextResponse.json({ status: "success", uploadUrl, fileName })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { status: "fail", error: e.message },
      { status: 500 }
    )
  }
}
