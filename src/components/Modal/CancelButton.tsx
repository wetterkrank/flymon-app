import { StyleSheet, Text, TouchableHighlight, ViewStyle } from "react-native";

export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const BORDER_COLOR_DARK = "#272729";
export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = 20;
export const HIGHLIGHT_COLOR_DARK = "#444444";
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";

type CancelButtonStyles = {
  button: ViewStyle;
  buttonLight: ViewStyle;
  buttonDark: ViewStyle;
  text: ViewStyle;
};

type CancelButtonProps = {
  isDarkModeEnabled?: boolean;
  onPress: () => void;
  label: string;
  style?: CancelButtonStyles;
};

export const CancelButton = ({
  isDarkModeEnabled = false,
  onPress,
  label,
  style = cancelButtonStyles,
}: CancelButtonProps) => {
  const themedButtonStyle = isDarkModeEnabled
    ? cancelButtonStyles.buttonDark
    : cancelButtonStyles.buttonLight;
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={[themedButtonStyle, style.button]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text
        style={[
          style.text,
          // buttonTextColorIOS && { color: buttonTextColorIOS },
        ]}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
};

export const cancelButtonStyles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS,
    height: 57,
    justifyContent: "center",
  },
  buttonLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  buttonDark: {
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
  text: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent",
  },
});
