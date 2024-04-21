import dayjs from "dayjs"
import { Dimensions, Platform } from "react-native";

export const formattedDate = (date: Date | null) => {
  return date ? dayjs(date).format("DD.MM.YYYY") : "none"
}

export const formattedApiDate = (date: Date | string) => {
  return dayjs(date).format("DD/MM/YYYY")
}

export const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 852 ||
      width === 852 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926 ||
      height === 932 ||
      width === 932)
  );
};
