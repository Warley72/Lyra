"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createUser } from "@/modules/users";

import styles from "./register.module.scss";

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

function EyeIcon({ visible }: { visible: boolean }) {
    if (visible) {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3 21 21" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M6.2 6.2C4.3 7.6 2.6 10.1 2.6 12c0 3 3.9 8 9.4 8 1.3 0 2.5-.3 3.6-.9" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");

        if (password !== confirmation) {
            setError("As senhas não coincidem.");
            return;
        }

        setIsLoading(true);

        try {
            await createUser({
                name,
                email,
                password,
            });

            router.replace("/login");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível criar sua conta.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={styles.container}>
            <section className={styles.register}>
                <div className={styles.containerTitle}>
                    <p className={styles.title}>Lyra</p>

                    <p>Create your account.</p>
                </div>

                <div className={styles.containerForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="name">
                                Name
                            </label>

                            <div className={styles.inputContainer}>
                                <UserIcon />

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Your name"
                                    autoComplete="name"
                                    minLength={2}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">
                                Email
                            </label>

                            <div className={styles.inputContainer}>
                                <MailIcon />

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">
                                Password
                            </label>

                            <div className={styles.inputContainer}>
                                <LockIcon />

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
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />

                                <button
                                    type="button"
                                    className={styles.showPassword}
                                    onClick={() =>
                                        setShowPassword(
                                            (value) => !value,
                                        )
                                    }
                                    aria-label="Show or hide password"
                                >
                                    <EyeIcon
                                        visible={showPassword}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirmation">
                                Confirm password
                            </label>

                            <div className={styles.inputContainer}>
                                <LockIcon />

                                <input
                                    id="confirmation"
                                    type={
                                        showConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmation}
                                    onChange={(event) =>
                                        setConfirmation(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />

                                <button
                                    type="button"
                                    className={styles.showPassword}
                                    onClick={() =>
                                        setShowConfirmation(
                                            (value) => !value,
                                        )
                                    }
                                    aria-label="Show or hide confirmation"
                                >
                                    <EyeIcon
                                        visible={
                                            showConfirmation
                                        }
                                    />
                                </button>
                            </div>
                        </div>

                        <p className={styles.helper}>
                            Password must contain at least 6
                            characters.
                        </p>

                        {error && (
                            <p
                                className={styles.error}
                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            className={styles.submit}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Creating account..."
                                : "Create account"}
                        </button>
                    </form>

                    <p className={styles.login}>
                        Already have an account?

                        <a href="/login">
                            Sign in
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
