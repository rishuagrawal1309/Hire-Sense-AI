function Navbar() {

  return (

    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-xl">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-wide">
            Hire-Sense AI
          </h1>

          <p className="text-sm text-blue-100 mt-1">
            Intelligent Resume Screening Platform
          </p>

        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-blue-100">

          <span>FastAPI</span>
          <span>Kubernetes</span>
          <span>Jenkins</span>
          <span>Docker</span>

        </div>

      </div>

    </nav>
  )
}

export default Navbar