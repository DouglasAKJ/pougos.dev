
"use client";

import { useEffect, useState } from "react";
import "../../public/ascii.css";

export default function AsciiPortrait({
  src,
  columns = 120,
  fontSize = 6,
  contrast = 2.55,
  brightness = 1.3,
  lineDelay = 15,
}) {
  const [lines, setLines] = useState([]);
  const [visibleLines, setVisibleLines] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!src) return;

    const image = new Image();

    image.onload = () => {
      const rows = Math.round(
        columns * (image.height / image.width) * 0.5
      );

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      canvas.width = columns;
      canvas.height = rows;

      ctx.drawImage(image, 0, 0, columns, rows);

      const pixels = ctx.getImageData(
        0, 0, columns, rows
      ).data;

      // Caracteres organizados por densidade visual
      const chars =
        " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

      const total = columns * rows;
      const gray = new Float32Array(total);

      // Converte a imagem para escala de cinza
      for (let i = 0; i < total; i++) {
        const p = i * 4;

        const r = pixels[p];
        const g = pixels[p + 1];
        const b = pixels[p + 2];

        let value =
          0.299 * r +
          0.587 * g +
          0.114 * b;

        // Ajuste de contraste e brilho
        value = (value - 128) * contrast + 128;
        value *= brightness;

        gray[i] = Math.max(0, Math.min(255, value));
      }

      // Floyd-Steinberg dithering
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const i = y * columns + x;

          const oldValue = Math.max(0, Math.min(255, gray[i]));

          const charIndex = Math.round(
            (oldValue / 255) * (chars.length - 1)
          );

          const newValue =
            (charIndex / (chars.length - 1)) * 255;

          const quantError = oldValue - newValue;

          gray[i] = newValue;

          // Distribui o erro entre os pixels vizinhos
          if (x + 1 < columns) {
            gray[i + 1] += quantError * (7 / 16);
          }

          if (y + 1 < rows) {
            if (x > 0) {
              gray[i + columns - 1] +=
                quantError * (3 / 16);
            }

            gray[i + columns] +=
              quantError * (5 / 16);

            if (x + 1 < columns) {
              gray[i + columns + 1] +=
                quantError * (1 / 16);
            }
          }
        }
      }

      // Gera a representação ASCII em linhas
      const generatedLines = [];

      for (let y = 0; y < rows; y++) {
        let rowStr = "";
        for (let x = 0; x < columns; x++) {
          const value = gray[y * columns + x];

          const index = Math.round(
            (value / 255) * (chars.length - 1)
          );

          rowStr += chars[index];
        }
        generatedLines.push(rowStr);
      }

      setLines(generatedLines);
      setVisibleLines(0);
      setError(null);
    };

    image.onerror = () => {
      setError("Não foi possível carregar a imagem.");
    };

    image.src = src;
  }, [src, columns, contrast, brightness]);

  useEffect(() => {
    if (lines.length === 0) return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, lineDelay);

    return () => clearInterval(interval);
  }, [lines, lineDelay]);

  if (error) return <p>{error}</p>;
  if (lines.length === 0) return <p>Gerando ASCII...</p>;

  return (
    <div className="ascii-container">
      <pre style={{ fontSize: `${fontSize}px` }}>
        {lines.slice(0, visibleLines).join("\n")}
      </pre>
    </div>
  );
}
