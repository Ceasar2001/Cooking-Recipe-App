import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo';
import { authStyles } from '../../assets/styles/auth.styles';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/colors';

const VerifyEmail = ({email, onBack}) => {

const { isLoaded, signUp, setActive } = useSignUp();
const [ code, setCode ] = useState('');
const [ loading, setLoading ] = useState(false);

const handleVerification = async () => {
  
  if(!isLoaded) return;
  
  setLoading(true);

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

    if(signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId });
      // Navigate to home or dashboard
    } else {
      // Handle other statuses like 'expired', 'failed', etc.
      Alert.alert('Verification Failed', 'Please check your code and try again.');
      console.error('Verification failed:', signUpAttempt.status);
    }

  } catch (error) {
    Alert.alert('Error', error.message || 'An error occurred during verification');
    console.error('Verification Error:', error);
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          {/* Title */}
          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to {email}</Text>

          <View style={authStyles.inputContainer}>
            {/* verification code input */}
            <View style={authStyles.inputContainer}>
              <TextInput 
                style={authStyles.textInput}
                placeholder='Enter Verification Code'
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize='none'
              />
            </View>

            {/* verify button */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Verifying..." : "Verify Email"}</Text>
            </TouchableOpacity>

            {/* back button to sign up */}
            <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default VerifyEmail