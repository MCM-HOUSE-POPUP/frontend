import { Link } from 'react-router-dom'

export default function TestPage() {
  return (
    <main>
      <h1>Test</h1>
      <Link to="/result">View Result</Link>
    </main>
  )
}