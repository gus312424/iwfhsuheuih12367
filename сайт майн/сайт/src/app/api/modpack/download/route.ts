import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

// Ищем любой файл в папке public/modpack/ (кроме .txt)
function findModpackFile(): string | null {
  const dir = join(process.cwd(), "public", "modpack");
  try {
    const files = readdirSync(dir).filter((f) => !f.endsWith(".txt"));
    if (files.length === 0) return null;
    return join(dir, files[0]);
  } catch {
    return null;
  }
}

function getContentType(filename: string): string {
  if (filename.endsWith(".rar")) return "application/x-rar-compressed";
  if (filename.endsWith(".7z")) return "application/x-7z-compressed";
  return "application/zip";
}

export async function GET(_req: NextRequest) {
  const filePath = findModpackFile();

  if (!filePath || !existsSync(filePath)) {
    return NextResponse.json(
      { error: "Файл модпака не найден. Положите архив в папку public/modpack/" },
      { status: 404 }
    );
  }

  try {
    const file = readFileSync(filePath);
    const ext = filePath.endsWith(".rar") ? ".rar" : filePath.endsWith(".7z") ? ".7z" : ".zip";
    const downloadName = `VEXIUM-modpack${ext}`;
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": getContentType(filePath),
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Content-Length": String(file.length),
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "Ошибка при чтении файла." }, { status: 500 });
  }
}
