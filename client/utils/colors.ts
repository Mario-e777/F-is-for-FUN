const COLORS = {
  black: 'rgb(10, 25, 41)',
  green_light: 'rgb(99, 223, 136)',
  blue_light: 'rgb(127, 191, 249)',
  background_gray: 'rgb(248, 248, 248)',
  yellow_light: 'rgb(248, 195, 147)',
  red_light: 'rgb(227, 122, 114)',
}

const SHADOWS = {
  medium: `0.3px 0.5px 0.7px hsl(286deg 36% 56% / 0.36),
  0.8px 1.6px 2px -0.8px hsl(286deg 36% 56% / 0.36),
  2.1px 4.1px 5.2px -1.7px hsl(286deg 36% 56% / 0.36),
  5px 10px 12.6px -2.5px hsl(286deg 36% 56% / 0.36)`,
  small: `0.3px 0.5px 0.7px hsl(286deg 36% 56% / 0.34),
  0.4px 0.8px 1px -1.2px hsl(286deg 36% 56% / 0.34),
  1px 2px 2.5px -2.5px hsl(286deg 36% 56% / 0.34)`
}

const TRANSITIONS = {
  normal: '235ms',
}

export {
  COLORS,
  SHADOWS,
  TRANSITIONS
}
