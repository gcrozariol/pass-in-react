import { useRouteError, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  function handleOnClickBack() {
    navigate(-1)
  }

  return (
    <div className="flex h-screen text-center">
      <div className="flex flex-col justify-center mx-auto">
        <p>
          Error |{' '}
          <span className="font-bold">{error.statusText || error.message}</span>
        </p>
        <br />
        <p>
          <button onClick={handleOnClickBack}>
            <span className="text-zinc-300 hover:text-zinc-100 transition-colors">
              Go back
            </span>
          </button>
        </p>
      </div>
    </div>
  )
}
