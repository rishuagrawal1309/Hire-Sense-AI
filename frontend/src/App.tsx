import { useState } from "react"

import Navbar from "./components/Navbar"
import UploadForm from "./components/UploadForm"
import ResultsTable from "./components/ResultsTable"

import type { Candidate } from "./types/candidate"

function App() {

  const [candidates, setCandidates] =
    useState<Candidate[]>([])

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <UploadForm
          setCandidates={setCandidates}
        />

        <ResultsTable
          candidates={candidates}
        />

      </div>

    </div>
  )
}

export default App