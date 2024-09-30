import { Text, TouchableOpacity, View } from 'react-native';
import CommentSVG from '../SVGComponents/CommentSVG';
import { styles, color } from '../../style';
import LikeSVG from '../SVGComponents/LikeSVG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updatePostLike } from '../../redux/posts/postOperations';
import { useAuth } from '../../utils/hooks';

const Social = ({ data = [], social = 'comment', idPost }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    user: { uid },
  } = useAuth();

  const { name } = useRoute();

  const socialIcon = {
    comment: CommentSVG,
    like: LikeSVG,
  };

  let activeIcon;
  if (social === 'comment') {
    activeIcon = data?.length > 0;
  } else if (social === 'like') {
    activeIcon = data.includes(uid);
  }

  const handleSocial = async () => {
    if (social === 'comment') {
      navigation.navigate('Nested', {
        screen: 'CommentsScreen',
        params: { idPost, fromRoute: name },
      });
    }
    if (social === 'like') {
      // const update = activeIcon ? data.filter(el => el !== uid) : [...data, uid];
      await dispatch(updatePostLike({ idPost, data: uid, isAdd: !activeIcon })).unwrap();
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
      >
        <IconName activeIcon={activeIcon} />
      </TouchableOpacity>

      <Text
        style={{
          ...styles.text,
          textAlignVertical: 'none',
          color: data?.length > 0 ? color.primary : color.placeholder,
        }}
      >
        {data?.length}
      </Text>
    </View>
  );
};

export default Social;
