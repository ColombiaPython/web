export function ConsoleMessage(): void {
  if (typeof window === "undefined") return;

  console.log(
    "%c 🐍 Python Colombia ",
    "background:#3776AB;color:#FFD43B;font-size:14px;font-weight:700;padding:4px 10px;border-radius:4px;"
  );

  console.log(
    "%cContribuye → https://github.com/ColombiaPython/web",
    "color:#3776AB;font-size:12px;"
  );
}

