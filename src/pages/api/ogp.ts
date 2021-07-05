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

const jaFont = `"Saitamaar", "Courier New", courier, monospace, "Noto Sans JP", -apple-system,
    blinkmacsystemfont, ヒラギノ角ゴ pro w3, hiragino kaku gothic pro, roboto, yugothic, yu gothic,
    游ゴシック体, 游ゴシック, メイリオ, meiryo, ｍｓ ｐゴシック, ms pgothic, sans-serif`;
const enFont = `"Courier New", courier, monospace, "Saitamaar", "Noto Sans JP", -apple-system,
    blinkmacsystemfont, ヒラギノ角ゴ pro w3, hiragino kaku gothic pro, roboto, yugothic, yu gothic,
    游ゴシック体, 游ゴシック, メイリオ, meiryo, ｍｓ ｐゴシック, ms pgothic, sans-serif`;

function checkLanguage(decodeText: string): boolean {
  let flag: boolean = false;
  for (let i = 0; i < decodeText.length; i++) {
    const code = decodeText.charCodeAt(i);
    if (code >= 256) {
      flag = true;
      break;
    }
  }
  return flag;
}

function createImage(aaText: string, flag: boolean): Buffer {
  const width = 1200 as const;
  const height = 630 as const;
  const padding = 40 as const;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background color
  ctx.fillStyle = "#101013";
  ctx.fillRect(0, 0, width, height);

  // AA text
  const aaTextCol = aaText.split("\n").length * 1.1618;
  const aaTextRow = Math.max(...aaText.split("\n").map((i) => i.length));

  const fontSize = Math.min((height - padding) / aaTextCol, (width - padding) / aaTextRow);
  ctx.font = `${fontSize}px ${flag ? jaFont : enFont}`;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  const line = sampleJson.color_samples[0].palette.length;

  sampleJson.color_samples[0].palette.map((color, index) => {
    gradient.addColorStop(index / line, color);
  });

  ctx.fillStyle = gradient;
  const metrics = ctx.measureText(aaText);
  const aaTextHeight = aaTextCol * fontSize;
  ctx.textBaseline = "top";
  ctx.fillText(aaText, width / 2 - metrics.width / 2, height / 2 - aaTextHeight / 2);

  return canvas.toBuffer();
}

export default async function Api(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { text } = request.query;
  if (!text) {
    response.writeHead(404);
    response.end();
    return;
  }

  const decodeText = decodeURI(String(request.query.text) || sampleJson.aa_samples[0].value);

  const flag = checkLanguage(decodeText);

  try {
    const buf = createImage(decodeText, flag);

    response.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buf.length,
      "Cache-Control": "max-age=86400",
    });
    response.end(buf, "binary");
  } catch {
    response.writeHead(404);
    response.end();
    return;
  }
}
