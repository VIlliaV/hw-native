import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { color } from '../../style';

const CreatePostSVG = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={props.fill}>
    <Rect width="24" height="24" fill={props.fill} />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.3 8.1H11.7V11.7H8.1V12.3H11.7V15.9H12.3V12.3H15.9V11.7H12.3V8.1Z"
      stroke={props.fill === color.accent ? color.bg : color.primary}
      fill-opacity="0.8"
    />
  </Svg>
);

export default CreatePostSVG;
