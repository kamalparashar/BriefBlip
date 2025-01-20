import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser"

function Summary() {
  const user = useSelector((state) => state.auth.status);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }
    try {
      const response = await axios.post(conf.n8n_url, {youtubeUrl:url})
      setSummary(response.data.output.summary)
      console.log("Workflow triggered:", response.data);
    } catch (error) {
      console.error("Error triggering workflow:", error);
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
            Generate Summary
          </button>
        </form>
        <div className="prose max-w-none p-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Video Summary</h1>
          {summary ? (
            <div className="whitespace-pre-line text-white">{parse(summary)}</div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Summary;
