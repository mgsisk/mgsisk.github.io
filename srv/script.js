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
const media = matchMedia('(prefers-color-scheme: dark)')
const updateColor = (scheme)=> {
  let color = Math.floor(Math.random() * (colors.length / 2))
  if (scheme.matches) {
    return document.documentElement.style.setProperty('--color-hyperlinks', colors[color + colors.length / 2])
  }

  document.documentElement.style.setProperty('--color-hyperlinks', colors[color])
}

updateColor(media)

media.addListener(updateColor)

document.querySelectorAll('[data-src]').forEach((element)=> {
  element.src = element.dataset.src

  if (element.dataset.poster) {
    element.poster = element.dataset.src
  }

  delete element.dataset.poster
  delete element.dataset.src
})
