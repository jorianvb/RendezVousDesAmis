import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
    View
} from 'react-native';

export default function signIn() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simuler la création de compte
      setTimeout(() => {
        console.log('Création de compte:', formData);
        setIsLoading(false);
        Alert.alert(
          'Succès', 
          'Votre compte a été créé avec succès !',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigation vers la page de connexion ou accueil
                // navigation.navigate('Login') ou navigation.navigate('Home')
              }
            }
          ]
        );
      }, 2000);

      // Remplacez par votre logique d'authentification
      // await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte');
    }
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
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez-nous dès aujourd'hui</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              
              {/* Prénom */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Prénom *</Text>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]}
                  placeholder="Entrez votre prénom"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  autoCapitalize="words"
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>

              {/* Nom */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom *</Text>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  placeholder="Entrez votre nom"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  autoCapitalize="words"
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value.toLowerCase())}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe *</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput, 
                      errors.password && styles.inputError
                    ]}
                    placeholder="Minimum 6 caractères"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirmation mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le mot de passe *</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput, 
                      errors.confirmPassword && styles.inputError
                    ]}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Bouton de création */}
              <TouchableOpacity 
                style={[
                  styles.signUpButton,
                  isLoading && styles.signUpButtonDisabled
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
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#ff4757',
    borderWidth: 1.5,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 50,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 4,
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    marginRight: 4,
  },
  loginText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
