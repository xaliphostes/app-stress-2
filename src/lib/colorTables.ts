/*
aggrnyl     agsunset    blackbody   bluered     blues       blugrn      bluyl       brwnyl
bugn        bupu        burg        burgyl      cividis     darkmint    electric    emrld
gnbu        greens      greys       hot         inferno     jet         magenta     magma
mint        orrd        oranges     oryel       peach       pinkyl      plasma      plotly3
pubu        pubugn      purd        purp        purples     purpor      rainbow     rdbu
rdpu        redor       reds        sunset      sunsetdark  teal        tealgrn     turbo
viridis     ylgn        ylgnbu      ylorbr      ylorrd      algae       amp         deep
dense       gray        haline      ice         matter      solar       speed       tempo
thermal     turbid      armyrose    brbg        earth       fall        geyser      prgn
piyg        picnic      portland    puor        rdgy        rdylbu      rdylgn      spectral
tealrose    temps       tropic      balance     curl        delta       oxy         edge
hsv         icefire     phase       twilight    mrybm       mygbm
*/

/*
Greys YlGnBu Greens Bluered Portland Blackbody Picnic...
*/

export const colorTables = [
    'Blackbody',    // 1
    'Bluered',
    'Blues',
    'Earth',
    'Electric',     // 5
    'Greens',
    'Greys',
    'Hot',
    'Jet',
    'Picnic',       // 10
    'Portland',
    'Rainbow',
    'RdBu',
    'Reds',
    'Viridis',      // 15
    'YlGnBu',
    'YlOrRd'        // 17
]


/*
export const viridis = [
    [0.000, "rgb(68, 1, 84)"],
    [0.111, "rgb(72, 40, 120)"],
    [0.222, "rgb(62, 74, 137)"],
    [0.333, "rgb(49, 104, 142)"],
    [0.444, "rgb(38, 130, 142)"],
    [0.556, "rgb(31, 158, 137)"],
    [0.667, "rgb(53, 183, 121)"],
    [0.778, "rgb(109, 205, 89)"],
    [0.889, "rgb(180, 222, 44)"],
    [1.000, "rgb(253, 231, 37)"]
]

export const complex = normalizeColorTable([
    '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99',
    '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a',
    '#ffff99', '#b15928'
])

// ----------------------------------------------

function normalizeColorTable(colors: string[]): (string | number)[][] {
    return colors.map((c, i) => [i / (colors.length - 1), c])
}
*/