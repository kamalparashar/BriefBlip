import { useState } from "react"
import {Input, Button} from "./index.js"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import parse from "html-react-parser"
import axios from 'axios'

function Summary() {
  const { register, handleSubmit, reset} = useForm()
  const user = useSelector((state) => state.auth.status)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getSummary = async (event) => {
    if (!user) {
      navigate("/login");
    }
    try {
      setLoading(true);
      const res = await axios.get(`https://briefblip-backend.onrender.com?youtubeUrl=${encodeURIComponent(event.url)}`);
      setData(res.data);
    } catch (error) {
      console.log("Error in Fetching Summary :: ", error);
      throw error;
    } finally {
      setLoading(false);
      reset({
        url: ""
      });
    }
  }


  return (
    <>
      <div className="max-w-[80%] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Get Video Summary
        </h1>
        <form onSubmit={handleSubmit(getSummary)} className="space-y-4">
          <div>
            <Input
              label="YouTube URL"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              {...register("url", {
                required: true,
              })}
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 rounded-md transition-colors bg-blue-500 hover:bg-blue-600 text-white"
            children= "Generate Summary"
          />
        </form>
        {loading ? (
          <div className="text-2xl font-bold text-center m-20">Loading...</div>
        ) : (
          <div className="prose max-w-none p-4">
            <h1 className="text-3xl font-bold my-6 text-white">
              Video Summary :
            </h1>
            <h1 className="text-2xl font-bold mb-4 text-white text-center">
              {data.title}
            </h1>
            {data.summary ? (
              <div className="whitespace-pre-line text-white">
                {parse(data.summary)}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Summary;