import Typography, { VerticalRhythm } from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

fairyGatesTheme.baseFontSize = '18px'
fairyGatesTheme.overrideThemeStyles = ({ rhythm }: VerticalRhythm) => ({
  li: {
    marginBottom: rhythm(1 / 4),
  },
})

const typography = new Typography(fairyGatesTheme)

export default typography
