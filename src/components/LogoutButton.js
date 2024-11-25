import { TouchableOpacity } from "react-native"
import LogoutIcon from "../../icons/LogoutIcon"

const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogoutIcon />
    </TouchableOpacity>
  );
};

export default LogoutButton;