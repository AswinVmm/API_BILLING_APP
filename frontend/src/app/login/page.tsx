"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await api
                .url("/auth/login")
                .post({ email, password })
                .unauthorized(() => {
                    alert("Invalid credentials");
                })
                .json<{ token: string }>();

            if (!res?.token) {
                alert("Login failed");
                return;
            }

            localStorage.setItem("token", res.token);

            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-6 border rounded-xl w-80">
                <h2 className="text-xl mb-4">Login</h2>

                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-black text-white px-4 py-2 w-full"
                >
                    Login
                </button>
            </div>
        </div>
    );
}