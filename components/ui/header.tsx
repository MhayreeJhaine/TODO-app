import { useTheme } from "@/hooks/themeContext";
import { Image, Pressable, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useGlobalStyle from "@/styles/globalStyle";

const Header = () => {
  const styles = useGlobalStyle();
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <View style={styles.header}>
      <Image source={require("../../assets/images/TODO.png")} />
      <Pressable onPress={toggleTheme}>
        <Feather
          name={theme === "light" ? "moon" : "sun"}
          size={25}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
};
export default Header;
