import { Text, TouchableOpacity, View } from 'react-native';
import CommentSVG from '../SVGComponents/CommentSVG';
import { styles } from '../../style/styles';
import { color } from '../../style/color';
import LikeSVG from '../SVGComponents/LikeSVG';
import { useNavigation } from '@react-navigation/native';

const Social = ({ amount = 0, social = 'comment' }) => {
  const navigation = useNavigation();

  const socialIcon = {
    comment: CommentSVG,
    like: LikeSVG,
  };

  const handleSocial = () => {
    if (social === 'comment') {
      navigation.navigate('Nested', { screen: 'CommentsScreen' });
    }
    if (social === 'like') {
      amount += 1;
    }
  };

  const IconName = socialIcon[social];

  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          handleSocial();
        }}
        activeOpacity={0.6}
        // style={{
        //   ...stylesPost.trashButton,
        //   backgroundColor: photoUri ? color.accent : color.bg_secondary,
        // }}
      >
        <IconName amount={amount} />
      </TouchableOpacity>

      <Text
        style={{
          ...styles.text,
          textAlignVertical: 'none',
          color: amount > 0 ? color.primary : color.placeholder,
        }}
      >
        {amount}
      </Text>
    </View>
  );
};

export default Social;
