export const signIn = jest.fn();
export const signOut = jest.fn();
export const revalidatePath = jest.fn();

export const handleLogout = jest.fn(async () => {
  await signOut({ redirectTo: "/auth/login" });
});

export const handleCredentialLogin = jest.fn((formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  // Mock validation logic
  if (!email || !password) {
    throw new Error("Invalid form data");
  }

  return { email, password };
});

export const onSubmit = jest.fn(async (data: any) => {
  setLoading(true);
  try {
    const response = await handleCredentialLogin(data);

    if (response) {
      router.push("/");
      toast.success("Login successful");
      setSession(data?.email);
      return;
    } else {
      toast.error("Login Failed");
    }
  } catch (e) {
    toast.error("Login Failed");
  } finally {
    setLoading(false);
  }
});
export const setLoading = jest.fn();
export const toast = {
  error: jest.fn(),
  success: jest.fn(),
};
export const router = {
  push: jest.fn(),
};
export const setSession = jest.fn();