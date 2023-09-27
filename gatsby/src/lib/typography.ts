import Typography from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

fairyGatesTheme.baseFontSize = '24px'
fairyGatesTheme.baseLineHeight = 1.25
fairyGatesTheme.scaleRatio = 1.5
fairyGatesTheme.overrideThemeStyles = ({ rhythm }) => ({
  li: {
    marginBottom: rhythm(1 / 4),
  },
  'h1,h2,h3,h4,h5,h6': {
    marginTop: 0,
    marginBottom: 0,
  },
  a: {
    backgroundImage: 'none',
    color: 'inherit',
    textShadow: 'none',
  },
})
// marginBottom: rhythm(1 / 3),

const typography = new Typography(fairyGatesTheme)

export default typography
