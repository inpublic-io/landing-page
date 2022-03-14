import { ReactComponent as Logo } from '../logo.svg';
import { Anchor, Box, Footer as GrommetFooter, Text } from 'grommet';
import { capitalize } from '../utils/strings';

const FooterAnchor = ({ ...rest }) => (
  <Anchor size="small" color="white" {...rest} />
);

const data: any[] = [
  {
    title: "App",
    refs: [
      {
        label: "home",
        href: "#header"
      },
      {
        label: "lists",
        href: "#hero"
      },
      {
        label: "analytics",
        href: "#analytics"
      },
      {
        label: "contact",
        href: "#contact"
      },
    ],
  }
];


function Footer() {
  return (
    <GrommetFooter background="#3E6866" pad="large" align="bottom">
      <Box gap="xsmall">
        <Box align="center" gap="small" onClick={() => {
          window.scrollTo(0, 0);
        }}>
          <Logo width={64} height={64} fill="#50C1AE" />
          <Text alignSelf="center" color="brand" weight="bold">
            inpublic
          </Text>
        </Box>
      </Box>
      <Box fill direction="row" justify="end">
        {data.map(item => (
          <Box gap="large" pad={{ horizontal: "large" }} key={item[0]}>
            <Text weight="bold" size="small">
              {item.title}
            </Text>
            <Box>
              {item.refs.map(({ label, href }: any) => (
                <FooterAnchor key={label} href={href}>{capitalize(label)}</FooterAnchor>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </GrommetFooter>
  );
}

export default Footer;
