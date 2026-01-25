import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { usePage } from "../../hooks/usePage";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, loading, error, setError, isAuthenticated } = useAuth();
    const { setTitle } = usePage();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setTitle("Login");
    }, [setTitle]);

    if (isAuthenticated) {
        navigate("/");
        return;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const success = await login(username, password);
        if (success) {
            navigate("/");
        }
    }

    return (
        <div className="w-full max-w-md mx-auto mt-8 px-4">
            <div className="bg-(--surface-background) border-2 border-(--primary) rounded p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <div className="p-3 bg-red-900/30 border border-red-700 rounded text-(--text-color) text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="username"
                            className="text-(--text-color) font-semibold text-sm"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                            className="px-3 py-2 border-b border-white bg-(--surface-background) text-(--text-color) focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-(--text-color) font-semibold text-sm"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                            className="px-3 py-2 border-b border-white bg-(--surface-background) text-(--text-color) focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 px-4 py-2 bg-(--primary) text-amber-50 rounded font-semibold cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-(--primary) text-center text-(--text-color) text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-(--primary) font-semibold hover:underline cursor-pointer"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
