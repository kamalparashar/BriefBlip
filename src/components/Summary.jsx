import { useState } from "react"
import { useNavigate } from "react-router-dom"
import conf from "../conf/conf"
import Modal from "./Modal"
import { useTrialUsage } from "./Hooks/useTrialUsage"
import TrialBanner from "./TrialBanner"
import axios from "axios"

function Summary({ session }) {
  const [url, setUrl] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [summary, setSummary] = useState()
  const { hasTrialsLeft, remainingTrials, incrementTrialUsage } =
    useTrialUsage()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url)
    if (!session && !hasTrialsLeft) {
      navigate("/login")
      return;
    }
    try {
      const response = await axios.post(conf.n8n_url, {youtubeUrl: url}, {headers: { 'Content-Type': 'application/json' }})
      console.log(response.data)
      setSummary(response.data.output.summary)
    } catch (error) {
      console.error("Error triggering workflow:", error);
    }

    if (!session) {
      incrementTrialUsage();
    }
    setShowModal(true);
  };

  return (
    <>
      {!session && <TrialBanner remainingTrials={remainingTrials} />}
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
            {session
              ? "Generate Summary"
              : hasTrialsLeft
              ? "Try it Free"
              : "Sign Up to Continue"}
          </button>
        </form>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Video Summary
            </h2>
            <div className="whitespace-pre-line text-gray-700">{summary}</div>
            {!session && remainingTrials > 0 && (
              <p className="mt-4 text-sm text-gray-500">
                You have {remainingTrials} free{" "}
                {remainingTrials === 1 ? "summary" : "summaries"} remaining
              </p>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Summary;
