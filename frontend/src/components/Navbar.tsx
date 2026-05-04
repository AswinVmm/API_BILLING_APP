import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex gap-4 p-4 border-b">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
        </div>
    );
}