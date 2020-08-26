const colors = [
  'firebrick',
  'chocolate',
  'goldenrod',
  'darkolivegreen',
  'green',
  'seagreen',
  'teal',
  'steelblue',
  'royalblue',
  'blueviolet',
  'darkmagenta',
  'mediumvioletred',
  //--------------//
  'crimson',
  'darkorange',
  'gold',
  'yellowgreen',
  'limegreen',
  'mediumseagreen',
  'lightseagreen',
  'deepskyblue',
  'dodgerblue',
  'mediumpurple',
  'violet',
  'hotpink',
]
const color = Math.floor(Math.random() * (colors.length / 2))
const media = matchMedia('(prefers-color-scheme: dark)')
const updateColor = (scheme)=> {
  if (scheme.matches) {
    return document.documentElement.style.setProperty('--color-hyperlinks', colors[color + colors.length / 2])
  }

  document.documentElement.style.setProperty('--color-hyperlinks', colors[color])
}

updateColor(media)

media.addListener(updateColor)
