import { useContext } from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import { Header as GrommetHeader, Anchor, ResponsiveContext, Box, Menu as GrommetMenu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
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
        items.map(({ label, href }: ResponsiveMenuItemProps) =>
          <Anchor margin="xsmall" key={label.trim().toLowerCase()} href={href} label={label} />
        )
      )}
    </Box>
  )
}

function Header() {
  const size = useContext(ResponsiveContext);

  return (
    <GrommetHeader pad={size === 'small' ? "medium" : "large"}>
      <Anchor
        href="/"
        icon={<Logo width={32} height={32} fill="#50C1AE" />}
        label={size === 'small' ? undefined : "inpublic"}
      />
      <ResponsiveMenu items={[
        {
          label: "Lists",
          href: "#lists",
        },
        {
          label: "Contact",
          href: "#contact",
        },
      ]} />
    </GrommetHeader>
  );
}

export default Header;
