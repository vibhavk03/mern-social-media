import { Box } from '@mui/material';
import { styled } from '@mui/system';

/* we can resuse this */
const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default FlexBetween;
