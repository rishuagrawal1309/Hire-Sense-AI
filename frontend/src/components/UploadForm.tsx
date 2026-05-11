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

    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Upload Job Description & Resumes
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="block mb-2 font-semibold">
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
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Upload Resumes
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
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >

          {loading
            ? "Analyzing..."
            : "Analyze Resumes"}

        </button>

      </form>

    </div>
  )
}

export default UploadForm