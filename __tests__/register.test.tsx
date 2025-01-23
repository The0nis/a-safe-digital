import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Register from "@/app/auth/register/page";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe("Register Page", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the registration form", () => {
        render(<Register />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    it("shows an error message if email is already registered", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 202,
            })
        ) as jest.Mock;

        render(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is already registered/i)).toBeInTheDocument();
        });

        expect(toast.error).not.toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("shows a success message and redirects on successful registration", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 201,
            })
        ) as jest.Mock;

        render(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Registration successful");
            expect(mockPush).toHaveBeenCalledWith("/auth/login");
        });
    });

    it("shows an error message on registration failure", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 400,
            })
        ) as jest.Mock;

        render(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Registration Failed");
        });

        expect(mockPush).not.toHaveBeenCalled();
    });

    it("shows an unexpected error message on network error", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("Network Error"))) as jest.Mock;

        render(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("An unexpected error occurred");
        });

        expect(mockPush).not.toHaveBeenCalled();
    });
});
