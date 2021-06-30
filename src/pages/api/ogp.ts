import { createCanvas, registerFont } from "canvas";
import dataUriToBuffer from "data-uri-to-buffer";
import { mkdtempSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { tmpdir } from "os";
import path from "path";
import fontDataURI from "../../../public/fonts/Saitamaar.ttf";
import sampleJson from "../../assets/json/sample.json";

const fontBuf = dataUriToBuffer(fontDataURI);
const td = mkdtempSync(path.join(tmpdir(), "gaming-aa"));
const fontFile = path.join(td, "Saitamaar.ttf");
writeFileSync(fontFile, fontBuf);

registerFont(fontFile, {
  family: "Saitamaar",
});

export default async function Api(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  console.log(request.query.text);
  const aaText = decodeURI(String(sampleJson.aa_samples[0].value));

  try {
    const buf = createImage(aaText);

    response.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buf.length,
      // "Cache-Control": "max-age=3600",
    });
    response.end(buf, "binary");
  } catch {
    response.writeHead(404);
    response.end();
    return;
  }
}

function createImage(aaText: string): Buffer {
  const width = 1200 as const;
  const height = 630 as const;
  const fontSizeLimit = 480 as const;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background color
  ctx.fillStyle = "#101013";
  ctx.fillRect(0, 0, width, height);

  // AA text
  const aaTextCol = aaText.split("\n").length;
  const aaTextRow = Math.max(...aaText.split("\n").map((i) => i.length));

  const fontSize = Math.min(fontSizeLimit / aaTextCol, (fontSizeLimit * 3) / aaTextRow);
  ctx.font = `${fontSize}px Saitamaar`;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  const line = sampleJson.color_samples[0].palette.length;

  sampleJson.color_samples[0].palette.map((color, index) => {
    gradient.addColorStop(index / line, color);
  });

  ctx.fillStyle = gradient;
  const metrics = ctx.measureText(aaText);
  const aaTextHeight = aaTextCol * fontSize * 1.1618;
  ctx.textBaseline = "top";
  ctx.fillText(aaText, width / 2 - metrics.width / 2, height / 2 - aaTextHeight / 2);

  return canvas.toBuffer();
}
