import { useState } from "react"

import Navbar from "./components/Navbar"
import UploadForm from "./components/UploadForm"
import ResultsTable from "./components/ResultsTable"
import SystemStatus from "./components/SystemStatus"

import type { Candidate } from "./types/candidate"

function App() {

  const [candidates, setCandidates] =
    useState<Candidate[]>([])

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">

            <SystemStatus />

            <div className="mt-6">

              <UploadForm
                setCandidates={setCandidates}
              />

            </div>

          </div>

          <div className="lg:col-span-2">

            <ResultsTable
              candidates={candidates}
            />

          </div>

        </div>

      </div>

    </div>
  )
}

export default App