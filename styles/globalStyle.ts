// import { useTheme } from "@/hooks/themeContext";
import { ScaledSheet } from "react-native-size-matters";
// import { Dimensions } from "react-native";
import { useTheme } from "@/hooks/themeContext";

// const { width, height } = Dimensions.get("screen");

const useGlobalStyle = () => {
  const { colors } = useTheme();

  return ScaledSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: "hidden",
    },

    container: {
      flex: 1,
      position: "relative",
    },

    defaultFont: {
      fontFamily: "JosefinSans",
    },

    imgContainer: {
      width: "100%",
      height: "190@s",
      overflow: "hidden",
    },

    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    content: {
      padding: "20@s",
      position: "absolute",
      top: "10@s",
      left: 0,
      right: 0,
      bottom: 0,
    },

    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    tIC: {
      backgroundColor: colors.secondary,
      flexDirection: "row",
      alignItems: "center",
      gap: "8@s",
      borderRadius: "8@s",
      paddingHorizontal: "15@s",
      paddingVertical: "5@s",
      marginVertical: "30@s",
    },

    btn: {
      width: "20@s",
      height: "20@s",
      borderRadius: "10@s",
      borderWidth: 1,
      borderColor: colors.tertiary,
      justifyContent: "center",
      alignItems: "center",
    },

    tI: {
      flex: 1,
      color: colors.tertiary,
      fontSize: "15@s",
    },

    tDC: {
      backgroundColor: colors.secondary,
      borderRadius: "8@s",
      marginBottom: "15@s",
      // flexGrow: 1,
    },

    tDL: {
      backgroundColor: colors.secondary,
      borderRadius: "8@s",
      paddingVertical: "10@s",
    },

    tDI: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: "15@s",
      paddingVertical: "15@s",
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },

    tDT: {
      flex: 1,
      marginLeft: "10@s",
      color: colors.listText,
      fontSize: "15@s",
    },

    tDTComplete: {
      textDecorationLine: "line-through",
      color: "#aaa",
    },

    lF: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "15@s",
      backgroundColor: colors.secondary,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
      borderBottomLeftRadius: "8@s",
      borderBottomRightRadius: "8@s",
    },

    lFT: {
      // color: colors.tick || "#777",
      color: colors.tertiary,
      fontSize: "13@s",
    },

    clearCompletedText: {
      color: colors.filterText,
      fontSize: "13@s",
    },

    tDFW: {
      alignItems: "center",
      marginTop: "10@s",
    },

    tDFF: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: colors.secondary,
      paddingVertical: "10@s",
      borderRadius: "8@s",
      width: "100%",
      marginBottom: "10@s",
    },

    filterText: {
      color: "#777",
      fontSize: "14@s",
    },

    filterTextActive: {
      color: colors.filterText,
      fontWeight: "700",
    },

    dragText: {
      color: "#aaa",
      fontSize: "12@s",
    },
  });
};

export default useGlobalStyle;
