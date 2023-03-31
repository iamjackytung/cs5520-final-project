import { View, Vibration, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { Input, Icon, Button } from "@rneui/themed";

const SignUpInfo = () => {
  const InputFieldsStyle = {
    borderWidth: 0,
  };

  return (
    <>
      <Header view="Home" title="My mentors" />
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Input
          containerStyle={{ width: "90%" }}
          placeholder="Input with label"
          label="LABEL"
          labelStyle={{ marginTop: 16 }}
          style={InputFieldsStyle}
        />
        <Input
          containerStyle={styles.inputContainerStyle}
          placeholder="Simple input"
          style={InputFieldsStyle}
        />
        <Input
          leftIcon={
            <Icon
              name="map-marker"
              type="font-awesome"
              color="#86939e"
              size={25}
            />
          }
          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
          containerStyle={styles.inputContainerStyle}
          placeholder="Input with left icon"
          style={InputFieldsStyle}
        />
        <Input
          rightIcon={
            <Icon
              name="chevron-right"
              type="entypo"
              color="#86939e"
              size={25}
            />
          }
          containerStyle={styles.inputContainerStyle}
          placeholder="Input with right icon"
          style={InputFieldsStyle}
        />
        <Input
          containerStyle={styles.inputContainerStyle}
          placeholder="Input with error message"
          errorMessage="Invalid input"
          style={InputFieldsStyle}
        />
        <Input
          containerStyle={[styles.inputContainerStyle]}
          placeholder="Shake input"
          style={InputFieldsStyle}
          ref={(ref) => (shakeInput = ref)}
          rightIcon={
            <Button
              title="Shake"
              onPress={() => {
                shakeInput && shakeInput.shake();
                Vibration.vibrate(1000);
              }}
            />
          }
          errorMessage="Shake me on error !"
        />
      </View>
    </>
  );
};

export default SignUpInfo;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 16,
    width: "90%",
  },
});
