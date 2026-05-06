export type ThemeFlavor = 'latte' | 'frappe' | 'macchiato' | 'mocha';

export type ThemeAccent =
  | 'rosewater'
  | 'flamingo'
  | 'pink'
  | 'mauve'
  | 'red'
  | 'maroon'
  | 'peach'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'sky'
  | 'sapphire'
  | 'blue'
  | 'lavender';

type Rgb = readonly [number, number, number];

type Palette = {
  base: Rgb;
  mantle: Rgb;
  crust: Rgb;
  surface0: Rgb;
  surface1: Rgb;
  surface2: Rgb;
  text: Rgb;
  subtext0: Rgb;
  subtext1: Rgb;
  overlay0: Rgb;
  overlay1: Rgb;
  overlay2: Rgb;
  rosewater: Rgb;
  flamingo: Rgb;
  pink: Rgb;
  mauve: Rgb;
  red: Rgb;
  maroon: Rgb;
  peach: Rgb;
  yellow: Rgb;
  green: Rgb;
  teal: Rgb;
  sky: Rgb;
  sapphire: Rgb;
  blue: Rgb;
  lavender: Rgb;
};

export const themeOrder: ThemeFlavor[] = ['latte', 'frappe', 'macchiato', 'mocha'];

export const themeLabels: Record<ThemeFlavor, string> = {
  latte: 'Latte',
  frappe: 'Frappe',
  macchiato: 'Macchiato',
  mocha: 'Mocha',
};

export const accentOrder: ThemeAccent[] = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender',
];

export const accentLabels: Record<ThemeAccent, string> = {
  rosewater: 'Rosewater',
  flamingo: 'Flamingo',
  pink: 'Pink',
  mauve: 'Mauve',
  red: 'Red',
  maroon: 'Maroon',
  peach: 'Peach',
  yellow: 'Yellow',
  green: 'Green',
  teal: 'Teal',
  sky: 'Sky',
  sapphire: 'Sapphire',
  blue: 'Blue',
  lavender: 'Lavender',
};

export const catppuccinPalettes: Record<ThemeFlavor, Palette> = {
  latte: {
    base: [239, 241, 245],
    mantle: [230, 233, 239],
    crust: [220, 224, 232],
    surface0: [204, 208, 218],
    surface1: [188, 192, 204],
    surface2: [172, 176, 190],
    text: [76, 79, 105],
    subtext0: [108, 111, 133],
    subtext1: [92, 95, 119],
    overlay0: [156, 160, 176],
    overlay1: [140, 143, 161],
    overlay2: [124, 127, 147],
    rosewater: [220, 138, 120],
    flamingo: [221, 120, 120],
    pink: [234, 118, 203],
    mauve: [136, 57, 239],
    red: [210, 15, 57],
    maroon: [230, 69, 83],
    peach: [254, 100, 11],
    yellow: [223, 142, 29],
    green: [64, 160, 43],
    teal: [23, 146, 153],
    sky: [4, 165, 229],
    sapphire: [32, 159, 181],
    blue: [30, 102, 245],
    lavender: [114, 135, 253],
  },
  frappe: {
    base: [48, 52, 70],
    mantle: [41, 44, 60],
    crust: [35, 38, 52],
    surface0: [65, 69, 89],
    surface1: [81, 87, 109],
    surface2: [98, 104, 128],
    text: [198, 208, 245],
    subtext0: [165, 173, 206],
    subtext1: [181, 191, 226],
    overlay0: [115, 121, 148],
    overlay1: [131, 139, 167],
    overlay2: [148, 156, 187],
    rosewater: [242, 213, 207],
    flamingo: [238, 190, 190],
    pink: [244, 184, 228],
    mauve: [202, 158, 230],
    red: [231, 130, 132],
    maroon: [234, 153, 156],
    peach: [239, 159, 118],
    yellow: [229, 200, 144],
    green: [166, 209, 137],
    teal: [129, 200, 190],
    sky: [153, 209, 219],
    sapphire: [133, 193, 220],
    blue: [140, 170, 238],
    lavender: [186, 187, 241],
  },
  macchiato: {
    base: [36, 39, 58],
    mantle: [30, 32, 48],
    crust: [24, 25, 38],
    surface0: [54, 58, 79],
    surface1: [73, 77, 100],
    surface2: [91, 96, 120],
    text: [202, 211, 245],
    subtext0: [165, 173, 203],
    subtext1: [184, 192, 224],
    overlay0: [110, 115, 141],
    overlay1: [128, 135, 162],
    overlay2: [147, 154, 183],
    rosewater: [244, 219, 214],
    flamingo: [240, 198, 198],
    pink: [245, 189, 230],
    mauve: [198, 160, 246],
    red: [237, 135, 150],
    maroon: [238, 153, 160],
    peach: [245, 169, 127],
    yellow: [238, 212, 159],
    green: [166, 218, 149],
    teal: [139, 213, 202],
    sky: [145, 215, 227],
    sapphire: [125, 196, 228],
    blue: [138, 173, 244],
    lavender: [183, 189, 248],
  },
  mocha: {
    base: [30, 30, 46],
    mantle: [24, 24, 37],
    crust: [17, 17, 27],
    surface0: [49, 50, 68],
    surface1: [69, 71, 90],
    surface2: [88, 91, 112],
    text: [205, 214, 244],
    subtext0: [166, 173, 200],
    subtext1: [186, 194, 222],
    overlay0: [108, 112, 134],
    overlay1: [127, 132, 156],
    overlay2: [147, 153, 178],
    rosewater: [245, 224, 220],
    flamingo: [242, 205, 205],
    pink: [245, 194, 231],
    mauve: [203, 166, 247],
    red: [243, 139, 168],
    maroon: [235, 160, 172],
    peach: [250, 179, 135],
    yellow: [249, 226, 175],
    green: [166, 227, 161],
    teal: [148, 226, 213],
    sky: [137, 220, 235],
    sapphire: [116, 199, 236],
    blue: [137, 180, 250],
    lavender: [180, 190, 254],
  },
};

const toRgb = ([red, green, blue]: Rgb) => `${red} ${green} ${blue}`;

export const getThemeVariables = (theme: ThemeFlavor, accent: ThemeAccent) => {
  const palette = catppuccinPalettes[theme];

  return {
    '--theme-bg': toRgb(palette.base),
    '--theme-bg-elevated': toRgb(palette.mantle),
    '--theme-surface': toRgb(palette.surface0),
    '--theme-surface-alt': toRgb(palette.surface1),
    '--theme-border': toRgb(palette.overlay0),
    '--theme-border-strong': toRgb(palette.overlay2),
    '--theme-text': toRgb(palette.text),
    '--theme-text-muted': toRgb(palette.subtext0),
    '--theme-text-subtle': toRgb(palette.subtext1),
    '--theme-accent': toRgb(palette[accent]),
    '--theme-accent-strong': toRgb(palette.mauve),
    '--theme-link': toRgb(palette.blue),
    '--theme-focus': toRgb(palette.lavender),
    '--theme-on-accent': toRgb(palette.crust),
    '--theme-shadow': toRgb(palette.crust),
  } as const;
};