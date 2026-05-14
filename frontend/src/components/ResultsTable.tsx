import type { Candidate } from "../types/candidate"

interface Props {
  candidates: Candidate[]
}

function ResultsTable({ candidates }: Props) {

  if (candidates.length === 0) {

    return (

      <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">

        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Ranked Candidates
        </h2>

        <p className="text-slate-500 text-lg">
          Upload resumes to view AI ranking results.
        </p>

      </div>
    )
  }

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 overflow-x-auto">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Ranked Candidates
          </h2>

          <p className="text-slate-500 mt-1">
            AI-based resume evaluation results
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {candidates.length} Candidates
        </div>

      </div>

      <table className="w-full border-collapse overflow-hidden rounded-xl">

        <thead>

          <tr className="bg-slate-800 text-white text-left">

            <th className="p-4">Rank</th>
            <th className="p-4">Candidate</th>
            <th className="p-4">Email</th>
            <th className="p-4">Skills</th>
            <th className="p-4">Final Score</th>

          </tr>

        </thead>

        <tbody>

          {candidates.map((candidate, index) => (

            <tr
              key={index}
              className="border-b hover:bg-slate-50 transition-all"
            >

              <td className="p-4 font-bold text-lg">
                #{index + 1}
              </td>

              <td className="p-4">

                <div className="font-semibold text-slate-800">
                  {candidate.name}
                </div>

                <div className="text-sm text-slate-500 mt-1">
                  {candidate.resume}
                </div>

              </td>

              <td className="p-4 text-slate-700">
                {candidate.email}
              </td>

              <td className="p-4">

                <div className="flex flex-wrap gap-2">

                  {candidate.skills.map((skill, i) => (

                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </td>

              <td className="p-4">

                <div className="text-2xl font-bold text-blue-600">
                  {candidate.final_score}%
                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ResultsTable
