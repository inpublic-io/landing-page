import {
  useLookupInpublicQuery
} from './api';
import { Button, Text, Box, ResponsiveContext } from 'grommet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Twitter } from 'grommet-icons';
import { useContext } from 'react';
import { formatNumber } from '../../utils/numbers';

export default function Follow() {
  const size = useContext(ResponsiveContext);
  const { data: inpublic, isLoading, isFetching } = useLookupInpublicQuery();

  return (
    <Box direction="column" style={{ position: "relative" }}>
      <Box
        color="black"
        height="18px"
        alignSelf='center'
        style={{
          borderRadius: "15px",
          cursor: "default",
          position: "absolute",
          top: (size === 'small' ? "-20px" : "-30px"),
        }}
      >
        <Box direction='row'>
          <Text size="xsmall" style={{ width: "24px" }}>
            Join
          </Text>
          <Box
            margin={{
              horizontal: "xsmall"
            }}
            width="auto"
          >
            {(isLoading && isFetching) ?
              <Skeleton
                baseColor='white'
                width="xsmall"
                height="10px"
                duration={.5}
              />
              :
              (<Text
                size="xsmall"
              >
                {formatNumber(inpublic?.followersCount || 0)}
              </Text>)
            }
          </Box>
          <Text size="xsmall">
            builders
          </Text>
        </Box>
      </Box>
      <Button
        primary
        color="#1d9bf0"
        gap="xsmall"
        style={{
          padding: "4px 22px",
        }}
        fill
        icon={<Twitter size="small" color="white" />}
        label={<Text size="small" color="white" weight="bold">{size !== 'small' && "Follow"} @inpublic_io</Text>}
        href={`https://twitter.com/intent/follow?original_referer=https%3A%2F%2F${window.location.host}%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Einpublic_io&region=follow_link&screen_name=inpublic_io`}
      />
    </Box>
  );
}
