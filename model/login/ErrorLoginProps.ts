export interface ErrorLoginProps {
    firstNameError: string;
    lastNameError: string;
    usernameError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
}

export function getError(
  field: keyof ErrorLoginProps,
  errors: ErrorLoginProps
): string {
  return errors[field] || '';
}