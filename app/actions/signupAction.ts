export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  address: string;
}

export async function validateSignup(
  data: SignupFormData,
): Promise<{ success: boolean; errors?: Record<string, string> }> {
  const errors: Record<string, string> = {};
  // Validate email
  if (!data.email.includes("@")) {
    errors.email = "Invalid email format";
  }

  // Validate password
  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true };
}
