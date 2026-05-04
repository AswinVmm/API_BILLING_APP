"use client";

import { useEffect, useState } from "react";
import { withAuth } from "@/lib/api";
import { unauthorized } from "next/dist/client/components/navigation";

export default function Dashboard() {
    const [apis, setApis] = useState<any[]>([]);

    useEffect(() => {
        fetchApis();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    const fetchApis = async () => {
        const res = await withAuth()
            .url("/api")
            .get()
            .unauthorized(() => {
                alert("Session expired. Please login again.");
                window.location.href = "/login";
            })
            .notFound(() => {
                alert("API not found");
            })
            .json<any[]>();

        setApis(res);
    };
    const createApi = async () => {
        await withAuth()
            .url("/api/create")
            .post({
                name: "Test API",
                baseUrl: "https://example.com",
            })
            .unauthorized(() => {
                alert("Login required");
            })
            .badRequest(() => {
                alert("Invalid input");
            });
        fetchApis();
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Your APIs</h1>

            {apis.map((api: any) => (
                <div key={api.id} className="border p-4 mb-2 rounded">
                    <h2 className="font-bold">{api.name}</h2>
                    <p>{api.baseUrl}</p>
                </div>
            ))}
            <button onClick={createApi} className="bg-blue-500 text-white p-2 mb-4">
                Create API
            </button>
        </div>
    );
}