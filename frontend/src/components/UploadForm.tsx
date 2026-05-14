import { useState } from "react"

import API from "../services/api"

import type { Candidate } from "../types/candidate"

interface Props {
  setCandidates: React.Dispatch<
    React.SetStateAction<Candidate[]>
  >
}

function UploadForm({
  setCandidates,
}: Props) {

  const [jdFile, setJdFile] =
    useState<File | null>(null)

  const [resumeFiles, setResumeFiles] =
    useState<FileList | null>(null)

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (!jdFile || !resumeFiles) {
      alert("Please upload files")
      return
    }

    const formData = new FormData()

    formData.append("jd", jdFile)

    for (let i = 0; i < resumeFiles.length; i++) {
      formData.append(
        "resumes",
        resumeFiles[i]
      )
    }

    try {

      setLoading(true)

      const response = await API.post(
        "/rank-resumes",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      )

      setCandidates(
        response.data.rankings
      )

    } catch (error) {

      console.error(error)

      alert("Error uploading files")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        Resume Analysis
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div>

          <label className="block mb-3 text-lg font-semibold text-slate-700">
            Upload Job Description
          </label>

          <input
            type="file"
            accept=".txt"
            onChange={(e) =>
              setJdFile(
                e.target.files
                  ? e.target.files[0]
                  : null
              )
            }
            className="w-full border-2 border-slate-200 p-4 rounded-xl bg-slate-50"
          />

        </div>

        <div>

          <label className="block mb-3 text-lg font-semibold text-slate-700">
            Upload Resume PDFs
          </label>

          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) =>
              setResumeFiles(
                e.target.files
              )
            }
            className="w-full border-2 border-slate-200 p-4 rounded-xl bg-slate-50"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >

          {loading
            ? "Analyzing Resumes..."
            : "Analyze Resumes"}

        </button>

      </form>

    </div>
  )
}

export default UploadForm