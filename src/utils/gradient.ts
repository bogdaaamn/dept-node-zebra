import stringHash from "@sindresorhus/string-hash";
import color from "tinycolor2";

// Inspo https://github.com/bukinoshita/random-gradient/
export default function (title: string): string {
  const hash = stringHash(title);

  // Generate random color
  const start = color({ h: hash % 360, s: 0.95, l: 0.5 }); //.toHexString()
  const end = start.triad()[1];

  // Generate random direction and return
  switch (hash % 4) {
    case 0:
      return `linear-gradient(to top right, ${start.toHexString()}, ${end.toHexString()})`;

    case 1:
      return `radial-gradient(circle, ${start.toHexString()}, ${end.toHexString()})`;

    case 2:
      return `linear-gradient(${start.toHexString()}, ${end.toHexString()})`;

    case 3:
      return `linear-gradient(to right, ${start.toHexString()}, ${end.toHexString()})`;

    default:
      return `linear-gradient(to top right, ${start.toHexString()}, ${end.toHexString()})`;
  }
}
