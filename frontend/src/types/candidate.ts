export interface Candidate {
  resume: string
  name: string
  email: string
  phone: string
  skills: string[]
  semantic_score: number
  skill_match_score: number
  final_score: number
}