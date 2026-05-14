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

    <div className="bg-white p-6 rounded-xl shadow-md mb-6">

      <h2 className="text-2xl font-bold mb-4">
        System Status
      </h2>

      <div className="space-y-2">

        <p>
          <span className="font-semibold">
            Backend Status:
          </span>{" "}

          <span className="text-green-600">
            {status}
          </span>
        </p>

        <p>
          <span className="font-semibold">
            AI Model:
          </span>{" "}

          {modelName}
        </p>

        <p>
          <span className="font-semibold">
            Architecture:
          </span>{" "}

          FastAPI + Kubernetes + Jenkins
        </p>

      </div>

    </div>
  )
}

export default SystemStatus