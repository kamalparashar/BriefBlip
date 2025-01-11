import React from 'react'
import { Link } from 'react-router'

function Landing() {
  return (
    <>
        <div className="max-w-full mx-auto px-4 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-100 mb-4">
                    AI-Powered YouTube Video Summarization
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    Get quick, accurate summaries of any YouTube video in seconds
                </p>
                <Link
                    to="/summary"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors"
                >
                    Try it now
                </Link>
            </div>
      
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-800 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-100">Quick Summaries</h3>
                    <p className="text-gray-300">
                    Save time by getting concise summaries of lengthy videos
                    </p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-100">AI-Powered</h3>
                    <p className="text-gray-300">
                    Advanced AI technology ensures accurate and relevant summaries
                    </p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-100">Easy to Use</h3>
                    <p className="text-gray-300">
                    Simply paste a YouTube URL and get your summary instantly
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing