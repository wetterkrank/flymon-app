/* eslint-disable */
// @ts-nocheck

import { Component } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal as ReactNativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { isIphoneX } from "../../helpers";

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

export class Modal extends Component {
  // static propTypes = {
  //   onBackdropPress: PropTypes.func,
  //   onHide: PropTypes.func,
  //   isVisible: PropTypes.bool,
  // };

  static defaultProps = {
    onBackdropPress: () => {},
    onHide: () => {},
    isVisible: false,
  };

  state = {
    isVisible: this.props.isVisible,
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
  };

  animVal = new Animated.Value(0);
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.isVisible) {
      this.show();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: ModalPropsType) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.show();
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this.hide();
    }
  }

  show = () => {
    this.setState({ isVisible: true });
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 1,
    }).start();
  };

  hide = () => {
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 0,
    }).start(() => {
      if (this._isMounted) {
        this.setState({ isVisible: false }, this.props.onHide);
      }
    });
  };

  render() {
    const {
      children,
      onBackdropPress,
      ...otherProps
    } = this.props;
    const { deviceHeight, deviceWidth, isVisible } = this.state;
    const backdropAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MODAL_BACKDROP_OPACITY],
      }),
    };
    const contentAnimatedStyle = {
      transform: [
        {
          translateY: this.animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [deviceHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    return (
      <ReactNativeModal
        transparent
        animationType="none"
        visible={isVisible}
        {...otherProps}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              backdropAnimatedStyle,
              { width: deviceWidth, height: deviceHeight },
            ]}
          />
        </TouchableWithoutFeedback>
        {isVisible && (
          <Animated.View
            style={[styles.content, contentAnimatedStyle, styles.modal]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        )}
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 10,
    marginBottom: isIphoneX() ? 34 : 10,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Modal;
