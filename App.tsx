import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
const passWordSchema = Yup.object().shape({
  passWordLength: Yup.number()
    .min(4, "Password length  gater then 4.")
    .max(20, "Password length  under 20 .")
    .required("Password length is required")
})
const App = () => {
  const [password, setPassWord] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [spacialCharacter, setSpacialCharacter] = useState(false);
  const generatePassword = (passWordLength: number) => {

    const upperCaseCharacters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const lowerCaseCharacters = "mnbvcxzasdfghjklpoiuytrewq";
    const numberCaseCharacters = "0123456789";
    const spacialCharacters = "@#$_-*&!%";

    //SECTION - create new password
    let passwordString = "";

    for (let i = 0; i < passWordLength; i) {

      if (i < passWordLength && upperCase) {
        let randomNum = Math.round(Math.random() * (upperCaseCharacters.length-1));
        passwordString += upperCaseCharacters.charAt(randomNum);
        i++;
      }

      if (i < passWordLength && lowerCase) {
        let randomNum = Math.round(Math.random() * (lowerCaseCharacters.length-1));
        passwordString += lowerCaseCharacters.charAt(randomNum);
        i++;
      }

      if (i < passWordLength && spacialCharacter) {
        let randomNum = Math.round(Math.random() * (spacialCharacters.length-1));
        passwordString += spacialCharacters.charAt(randomNum);
        i++;
      }

      if (i < passWordLength && number) {
        let randomNum = Math.round(Math.random() * (numberCaseCharacters.length-1));
        passwordString += numberCaseCharacters.charAt(randomNum);
        i++
      }

    }

    setPassWord(passwordString);
    setIsPasswordGenerated(true)
  }

  const reset = () => {
    setPassWord("");
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSpacialCharacter(false)

  }


  return (
    <ScrollView>
      <SafeAreaView>
        <View >
          <Text style={styles.appTitle}>PASSWORD GENERATOR</Text>

          <Formik
            initialValues={{ passWordLength: "" }}
            validationSchema={passWordSchema}
            onSubmit={(values) => generatePassword(+values.passWordLength)}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                <View>
                  <View style={styles.inputWrapper}>
                    <View>
                      <Text style={styles.inputTitle}>Enter Password Length :</Text>
                      {touched.passWordLength && errors.passWordLength && (
                        <Text style={styles.errorMessage}>{errors.passWordLength}</Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.textInput}
                      value={values.passWordLength}
                      placeholder='Ex : 8'
                      keyboardType='numeric'
                      onChangeText={handleChange('passWordLength')}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}> Add lower case</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor='#55E6C1'
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}> Add upper case</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor='#ffd32a'
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}> Add number</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={number}
                      onPress={() => setNumber(!number)}
                      fillColor='#4bcffa'
                      
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}> Add special characters</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={spacialCharacter}
                      onPress={() => setSpacialCharacter(!spacialCharacter)}
                      fillColor='#C4E538'
                    />
                  </View>

                </View>
                <View style={styles.btnContainer} >

                  <View>
                    <TouchableOpacity
                      style={[styles.btn, styles.primaryBtn]}
                      onPress={handleSubmit}

                    >
                      <Text style={styles.btnText}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={[styles.btn, styles.seconDaryBtn]}
                      onPress={() => {
                        handleReset(),
                          reset()
                      }}>
                      <Text style={styles.btnText}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>

            )}

          </Formik>

          {isPasswordGenerated ?
            <View style={styles.passwordContainer}>
              <Text style={styles.passwordContainerHeading}>Long press for copy and share</Text>
              <Text
                style={styles.passwordText}
                selectable={true}
                selectionColor="#7efff5"
              >
                {password}
              </Text>
            </View>
            : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#182C61",
    alignSelf: "center",
    marginVertical: 30
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10
  },
  inputTitle: {
    fontSize: 20,
    color: '#2C3A47'
  },
  errorMessage: {
    fontSize: 12,
    color: "#eb2f06"
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2C3A47",
    width: "30%",
    padding: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
  btn: {
    width: 170,
    borderRadius: 8,
    padding: 10,
  },
  primaryBtn: {

    backgroundColor: "#0652DD",

  },
  seconDaryBtn: {
    backgroundColor: "#ced6e0"
  },
  btnText: {
    color: "#ffffff",
    alignSelf: "center",
    fontSize: 15
  },
  passwordContainer: {
    backgroundColor: "#57606f",
    width: 300,
    height: 200,
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    // justifyContent:"space-evenly"

  },
  passwordContainerHeading: {
    color: "#ced6e0",
    marginVertical: 10,
    fontSize: 15
  },
  passwordText: {
    color: "#f1f2f6",
    fontSize: 25,
    letterSpacing: 2
  }
})