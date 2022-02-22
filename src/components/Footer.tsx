import { ReactComponent as Logo } from '../logo.svg';
import { Anchor, Box, Footer as GrommetFooter, Text } from 'grommet';

const FooterAnchor = ({ ...rest }) => (
  <Anchor href="/" size="small" color="white" {...rest} />
);

const data: any[] = [
  [
    "App",
    "home",
    "beta",
    "sponsors"
  ],
  [
    "Legal",
    "terms",
    "privacy",
    "security"
  ],
  [
    "Company",
    "about",
    "press",
    "jobs"
  ],
];


function Footer() {
  return (
    <GrommetFooter background="#3E6866" pad="large" align="bottom">
      <Box gap="xsmall">
        <Box align="center" gap="small">
          <Logo width={64} height={64} fill="#50C1AE" />
          <Text alignSelf="center" color="brand" weight="bold">
            inpublic
          </Text>
        </Box>
      </Box>
      <Box fill direction="row" justify="end">
        {data.map(item => (
          <Box gap="large" pad={{horizontal: "large"}} key={item[0]}>
            <Text weight="bold" size="small">
              {item[0]}
            </Text>
            <Box>
              {[1, 2, 3].map(i => (
                <FooterAnchor key={item[i]}>{item[i].charAt(0).toUpperCase() + item[i].slice(1)}</FooterAnchor>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </GrommetFooter>
  );
}

export default Footer;
