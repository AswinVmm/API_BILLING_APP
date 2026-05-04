import { withAuth } from "@/lib/api";

export default function ApiCard({ apiData }: any) {
    const generateKey = async () => {
        await withAuth()
            .url("/apikey/generate")
            .post({ apiId: apiData.id });

        alert("API Key Generated");
    };

    return (
        <div className="border p-4 rounded mb-3">
            <h2>{apiData.name}</h2>

            <button
                onClick={generateKey}
                className="bg-green-500 text-white px-3 py-1 mt-2"
            >
                Generate API Key
            </button>
        </div>
    );
}