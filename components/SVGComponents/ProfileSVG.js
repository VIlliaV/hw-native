import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { color } from '../../style';

const ProfileSVG = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect width="24" height="24" fill={props.fill} />
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={props.fill === color.accent ? color.bg : color.primary}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={props.fill === color.accent ? color.bg : color.primary}
      stroke-opacity="0.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default ProfileSVG;
