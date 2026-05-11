import type { Candidate } from "../types/candidate"

interface Props {
  candidates: Candidate[]
}

function ResultsTable({ candidates }: Props) {

  if (candidates.length === 0) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-6">
        Ranked Candidates
      </h2>

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-gray-200">

            <th className="p-3 text-left">
              Rank
            </th>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Skills
            </th>

            <th className="p-3 text-left">
              Final Score
            </th>

          </tr>
        </thead>

        <tbody>

          {candidates.map((candidate, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="p-3">
                {index + 1}
              </td>

              <td className="p-3">
                {candidate.name}
              </td>

              <td className="p-3">
                {candidate.email}
              </td>

              <td className="p-3">
                {candidate.skills.join(", ")}
              </td>

              <td className="p-3 font-bold text-blue-600">
                {candidate.final_score}%
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ResultsTable