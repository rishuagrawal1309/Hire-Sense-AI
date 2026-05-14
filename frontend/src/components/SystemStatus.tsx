import { useEffect, useState } from "react"

import {
  getHealth,
  getModelInfo
} from "../services/api"

function SystemStatus() {

  const [status, setStatus] =
    useState("Checking...")

  const [modelName, setModelName] =
    useState("Loading...")

  useEffect(() => {

    const fetchData = async () => {

      try {

        const health =
          await getHealth()

        const model =
          await getModelInfo()

        setStatus(
          health.data.status
        )

        setModelName(
          model.data.model_name
        )

      } catch {

        setStatus("Unavailable")

      }
    }

    fetchData()

  }, [])

  return (

    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          System Status
        </h2>

        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          Live
        </div>

      </div>

      <div className="space-y-4 text-slate-700">

        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Backend Status
          </span>

          <span className="text-green-600 font-bold">
            {status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold">
            AI Model
          </span>

          <span>
            {modelName}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Architecture
          </span>

          <span>
            Microservices
          </span>
        </div>

      </div>

    </div>
  )
}

export default SystemStatus