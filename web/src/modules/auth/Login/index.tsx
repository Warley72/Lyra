"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login, saveAuthToken } from "@/modules/auth";

import styles from "./login.module.scss";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { token } = await login(email, password);
            saveAuthToken(token);
            router.replace("/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Não foi possível entrar. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.ContainerTitle}>
                    <p className={styles.title}>Lyra</p>
                    <p>Welcome back.</p>
                </div>

                <div className={styles.ContainerForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="email">
                                Email
                            </label>

                            <div className={styles.inputContainer}>
                                <span className={styles.icon}>
                                    ✉
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <div className={styles.passwordHeader}>
                                <label htmlFor="password">
                                    Password
                                </label>

                                <a href="#">
                                    Forgot password?
                                </a>
                            </div>

                            <div className={styles.inputContainer}>
                                <span className={styles.icon}>
                                    ♙
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="••••••••"
                                    required
                                />

                                <button
                                    type="button"
                                    className={styles.showPassword}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "◉" : "◌"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className={styles.error}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className={styles.register}>
                        <span>
                            Don't have an account?
                        </span>

                        <a href="/cadastro">
                            Create account
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
