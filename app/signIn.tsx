import { auth } from '@/config/firebaseConfig';
import { ErrorLoginProps, getError } from '@/model/login/ErrorLoginProps';
import {
  FormLoginProps,
  getErrorFieldName,
} from '@/model/login/FormLoginProps';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignIn() {
  const [formData, setFormData] = useState<FormLoginProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorLoginProps>({
    firstNameError: '',
    lastNameError: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  // Validation email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation mot de passe
  const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum 6 caractères
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors: ErrorLoginProps = {
      firstNameError: '',
      lastNameError: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstNameError = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastNameError = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.emailError = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.emailError = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.passwordError = 'Le mot de passe est requis';
    } else if (!validatePassword(formData.password)) {
      newErrors.passwordError =
        'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPasswordError = 'Confirmez votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPasswordError = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    // Retourne true si aucune erreur n'est présente
    return Object.values(newErrors).every(err => !err);
  };

  const handleInputChange = (field: keyof FormLoginProps, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Effacer l'erreur quand l'utilisateur commence à taper
    // Il faut mapper les champs du formulaire vers les champs d'erreur
    const errorField = getErrorFieldName(field);
    if (errorField && getError(errorField, errors)) {
      setErrors(prev => ({ ...prev, [errorField]: '' }));
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        console.log('Utilisateur créé avec succès:', user);
        setIsLoading(false);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          "Erreur lors de la création de l'utilisateur:",
          errorCode,
          errorMessage
        );
        setIsLoading(false);
      });
  };

  const navigateToLogin = () => {
    // navigation.navigate('Login');
    Alert.alert('Navigation', 'Redirection vers la page de connexion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>
                Rejoignez-nous dès aujourd&apos;hui
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Prénom */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Prénom *</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.firstNameError && styles.inputError,
                  ]}
                  placeholder="Entrez votre prénom"
                  value={formData.firstName}
                  onChangeText={value => handleInputChange('firstName', value)}
                  autoCapitalize="words"
                />
                {errors.firstNameError ? (
                  <Text style={styles.errorText}>{errors.firstNameError}</Text>
                ) : null}
              </View>

              {/* Nom */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom *</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.lastNameError && styles.inputError,
                  ]}
                  placeholder="Entrez votre nom"
                  value={formData.lastName}
                  onChangeText={value => handleInputChange('lastName', value)}
                  autoCapitalize="words"
                />
                {errors.lastNameError ? (
                  <Text style={styles.errorText}>{errors.lastNameError}</Text>
                ) : null}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={[styles.input, errors.emailError && styles.inputError]}
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChangeText={value =>
                    handleInputChange('email', value.toLowerCase())
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {errors.emailError ? (
                  <Text style={styles.errorText}>{errors.emailError}</Text>
                ) : null}
              </View>

              {/* Mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe *</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      errors.passwordError && styles.inputError,
                    ]}
                    placeholder="Minimum 6 caractères"
                    value={formData.password}
                    onChangeText={value => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.passwordError ? (
                  <Text style={styles.errorText}>{errors.passwordError}</Text>
                ) : null}
              </View>

              {/* Confirmation mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le mot de passe *</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      errors.confirmPasswordError && styles.inputError,
                    ]}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={value =>
                      handleInputChange('confirmPassword', value)
                    }
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPasswordError ? (
                  <Text style={styles.errorText}>
                    {errors.confirmPasswordError}
                  </Text>
                ) : null}
              </View>

              {/* Bouton de création */}
              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  isLoading && styles.signUpButtonDisabled,
                ]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <Text style={styles.signUpButtonText}>
                  {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Déjà un compte ?</Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.loginText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginLeft: 4,
    marginTop: 5,
  },
  eyeButton: {
    padding: 5,
    position: 'absolute',
    right: 15,
  },
  flex: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    marginRight: 4,
  },
  form: {
    marginBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#e1e5e9',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputError: {
    borderColor: '#ff4757',
    borderWidth: 1.5,
  },
  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  loginText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  passwordContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#fff',
    borderColor: '#e1e5e9',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingRight: 50,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  signUpButton: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    elevation: 4,
    marginTop: 12,
    paddingVertical: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  signUpButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: '#1a1a1a',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
