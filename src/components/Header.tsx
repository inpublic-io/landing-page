import { useContext } from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import { Header as GrommetHeader, Anchor, ResponsiveContext, Box, Menu as GrommetMenu } from 'grommet';
import {
  Menu as MenuIcon,
  Chat,
  ChatOption,
  Optimize
} from 'grommet-icons';
import styled from 'styled-components';
import Follow from '../features/twitter/Follow';


const Menu = styled(GrommetMenu)`
  &>div {
    padding: 0 6px;
  }
`;

type ResponsiveMenuItemProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

const ResponsiveMenu = ({ items }: any): JSX.Element => {
  const size = useContext(ResponsiveContext);

  return (
    <Box justify="end" direction="row" gap={size === "small" ? "medium" : "small"}>
      <Follow />
      <Box width="6px" height="100%" />
      {(['xsmall', 'small', 'medium'].indexOf(size) >= 0) ? (
        <Menu
          a11yTitle="Navigation Menu"
          dropProps={{ align: { top: 'bottom', right: 'right' } }}
          icon={<MenuIcon color="brand" />}
          items={items}
        />
      ) : (
        items.map(({ label, href, icon }: ResponsiveMenuItemProps) =>
          <Anchor margin="xsmall" icon={size !== 'large' ? icon : undefined} key={label.trim().toLowerCase()} href={href} label={label} />
        )
      )}
    </Box>
  )
}

function Header() {
  const size = useContext(ResponsiveContext);

  return (
    <GrommetHeader
      id='header'
      pad={size === 'small' ? "medium" : "large"}
      background='white'
    >
      <Anchor
        href="#hero"
        icon={<Logo width={32} height={32} fill="#50C1AE" />}
        label={size === 'small' ? undefined : "inpublic"}
      />
      <ResponsiveMenu items={[
        {
          label: "Lists",
          href: "#hero",
          icon: <ChatOption size='small' style={{ padding: ['large', 'xlarge'].indexOf(size) >= 0 ? '0 4px' : '6px' }} />
        },
        {
          label: "Analytics",
          href: "#analytics",
          icon: <Optimize size='small' style={{ padding: ['large', 'xlarge'].indexOf(size) >= 0 ? '0 4px' : '6px' }} />
        },
        {
          label: "Contact",
          href: "#contact",
          icon: <Chat size='small' style={{ padding: ['large', 'xlarge'].indexOf(size) >= 0 ? '0 4px' : '6px' }} />
        },
      ]} />
    </GrommetHeader>
  );
}

export default Header;
