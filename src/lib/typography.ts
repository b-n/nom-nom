import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';

fairyGatesTheme.baseFontSize = '18px';
fairyGatesTheme.overrideThemeStyles = ({ rhythm }) => ({
  li: {
    marginBottom: rhythm(1 / 4),
  },
  'h1,h2,h3,h4,h5,h6': {
    marginTop: 0,
    marginBottom: rhythm(1 / 3),
  },
  h6: {
    color: 'grey',
  },
  a: {
    backgroundImage: 'none',
    color: 'inherit',
    textShadow: 'none',
  },
});

const typography = new Typography(fairyGatesTheme);

export default typography;
