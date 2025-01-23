import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { handleCredentialLogin } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useStore from "@/lib/store";
import Login from "@/app/auth/login/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/actions", () => ({
  handleCredentialLogin: jest.fn(),
}));

jest.mock("@/lib/store", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setSession: jest.fn(),
  })),
}));

describe("Login Page", () => {
  const mockPush = jest.fn();
  const mockSetSession = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useStore as unknown as jest.Mock).mockReturnValue({
      setSession: mockSetSession,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("calls onSubmit when the form is submitted", async () => {
    (handleCredentialLogin as jest.Mock).mockResolvedValue({});

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(handleCredentialLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/");
    expect(toast.success).toHaveBeenCalledWith("Login successful");
    expect(mockSetSession).toHaveBeenCalledWith("test@example.com");
  });

  it("shows an error message if login fails", async () => {
    (handleCredentialLogin as jest.Mock).mockResolvedValue({ error: "error" });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(handleCredentialLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(toast.error).toHaveBeenCalledWith("Login Failed");
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockSetSession).not.toHaveBeenCalled();
  });
});
