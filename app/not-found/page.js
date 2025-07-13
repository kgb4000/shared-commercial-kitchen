export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">
        Sorry, we couldn't find that page.
      </h1>
      <p className="text-gray-600 mb-6">
        It looks like this city or state doesn't have any listed commercial
        kitchens yet.
      </p>
      <a href="/" className="text-blue-500 underline hover:text-blue-700">
        Return to homepage
      </a>
    </div>
  )
}
