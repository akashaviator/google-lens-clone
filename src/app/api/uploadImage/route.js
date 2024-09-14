import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json(
        { status: "fail", error: "No file uploaded" },
        { status: 400 }
      )
    }

    const uploadsDir = path.resolve("./public", "uploads")

    try {
      await fs.access(uploadsDir)
    } catch (error) {
      await fs.mkdir(uploadsDir, { recursive: true })
    }

    let fileName = file.name

    const specifiedFileName = formData.get("fileName")
    if (specifiedFileName) {
      fileName = specifiedFileName

      const existingFilePath = path.join(uploadsDir, fileName)
      try {
        await fs.access(existingFilePath)
        await fs.unlink(existingFilePath)
      } catch (error) {}
    } else {
      fileName = `${Date.now()}-${file.name}`
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(path.join(uploadsDir, fileName), buffer)

    return NextResponse.json({ status: "success", fileName: fileName })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { status: "fail", error: e.message },
      { status: 500 }
    )
  }
}
