import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import TrialBanner from "./TrialBanner";
import { useSelector } from "react-redux";
import axios from "axios";

function Summary() {
  const user = useSelector((state) => state.auth.status);
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState("unable to generate summary")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(conf.n8n_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {youtubeUrl:url},
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Workflow triggered:", responseData);
      setSummary(response.data.output.summary)
    } catch (error) {
      console.error("Error triggering workflow:", error.message);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Get Video Summary
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              YouTube URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          >
            {user
              ? "Generate Summary"
              : "Sign Up to Continue"}
          </button>
        </form>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Video Summary
            </h2>
            {summary?(
              <div className="whitespace-pre-line text-gray-700">{summary}</div>
            ):null
            }
            
          </div>
      </div>
    </>
  );
}

export default Summary;
