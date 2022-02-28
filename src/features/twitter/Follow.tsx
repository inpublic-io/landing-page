import {
  useLookupInpublicQuery
} from './api';
import { Button, Text, Box, ResponsiveContext } from 'grommet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Twitter } from 'grommet-icons';
import { useContext } from 'react';

const thousands = 4;
const millions = 7;
const billions = 10;

const formatNumber = (source: number): string => {
  const inString = source.toString();
  const length = inString.length;
  
  // TODO turn units into maps and iterate through them
  if (length >= billions) {
    return inString.substring(0, length - (billions - 1)) + "B";
  } else if (length >= millions) {
    return inString.substring(0, length - (millions - 1)) + "M"
  } else if (length >= thousands) {
    return inString.substring(0, length - (thousands - 1)) + "K"
  }
  return inString;
}

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
        onClick={() => { }}
      />
    </Box>
  );
}
