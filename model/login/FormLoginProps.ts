import { ErrorLoginProps } from './ErrorLoginProps';

export interface FormLoginProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Fonction helper pour mapper les champs
export function getErrorFieldName(
  field: keyof FormLoginProps
): keyof ErrorLoginProps | null {
  const mapping: Record<keyof FormLoginProps, keyof ErrorLoginProps> = {
    firstName: 'firstNameError',
    lastName: 'lastNameError',
    email: 'emailError',
    password: 'passwordError',
    confirmPassword: 'confirmPasswordError',
  };
  return mapping[field] || null;
}
