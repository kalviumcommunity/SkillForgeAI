import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#007bff] p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#212529]">SkillForgeAI</h1>
      <div className="space-x-6 text-[#212529] font-medium">
        <Link to="/chatbot" className="hover:underline">Chatbot</Link>
        <Link to="/multishot" className="hover:underline">Multi-shot</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  );
}
