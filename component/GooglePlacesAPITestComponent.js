'use client'

import { useState } from 'react'

export default function GooglePlacesTest() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [testPlaceId, setTestPlaceId] = useState('ChIJN1t_tDeuEmsRUsoyG83frY4') // Google Sydney office

  const testApi = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('🧪 Testing Google Places API with Place ID:', testPlaceId)

      const response = await fetch('/api/google-place-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: testPlaceId }),
      })

      console.log('🧪 Response status:', response.status, response.statusText)
      console.log(
        '🧪 Response headers:',
        Object.fromEntries(response.headers.entries())
      )

      const data = await response.json()
      console.log('🧪 Response data:', data)

      setResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: data,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('🧪 Test error:', error)
      setResult({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const testEnvironment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-env')
      const data = await response.json()
      console.log('🌍 Environment check:', data)
      setResult({
        type: 'environment',
        data: data,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('🌍 Environment test error:', error)
      setResult({
        type: 'environment',
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        🧪 Google Places API Debugger
      </h2>

      {/* Current Environment Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Current Environment:</h3>
        <div className="text-sm space-y-1">
          <p>
            <strong>URL:</strong> {window.location.href}
          </p>
          <p>
            <strong>Host:</strong> {window.location.hostname}
          </p>
          <p>
            <strong>Protocol:</strong> {window.location.protocol}
          </p>
        </div>
      </div>

      {/* Test Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="placeId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Test Place ID:
          </label>
          <input
            type="text"
            id="placeId"
            value={testPlaceId}
            onChange={(e) => setTestPlaceId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a Google Place ID to test"
          />
          <p className="text-xs text-gray-500 mt-1">
            Default is Google Sydney office. Try your kitchen's Place ID.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={testApi}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Testing API...' : '🧪 Test Places API'}
          </button>

          <button
            onClick={testEnvironment}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Checking...' : '🌍 Check Environment'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              result.success === false
                ? 'bg-red-50 border border-red-200'
                : result.success === true
                ? 'bg-green-50 border border-green-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">
                {result.success === false
                  ? '❌'
                  : result.success === true
                  ? '✅'
                  : '🔍'}
              </span>
              <h3 className="text-lg font-semibold">
                {result.type === 'environment'
                  ? 'Environment Check'
                  : 'API Test'}{' '}
                Result
              </h3>
            </div>

            {/* Status Info */}
            {result.status && (
              <div className="mb-3 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    result.status >= 200 && result.status < 300
                      ? 'bg-green-100 text-green-800'
                      : result.status >= 400 && result.status < 500
                      ? 'bg-red-100 text-red-800'
                      : result.status >= 500
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  HTTP {result.status} {result.statusText}
                </span>
              </div>
            )}

            {/* Error Message */}
            {result.error && (
              <div className="mb-3 p-3 bg-red-100 rounded text-red-800 text-sm">
                <strong>Error:</strong> {result.error}
              </div>
            )}

            {/* Success Data */}
            {result.data && (
              <div className="space-y-3">
                {result.type === 'environment' ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Has API Key:</strong>
                      <span
                        className={
                          result.data.hasGoogleApiKey
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {result.data.hasGoogleApiKey ? ' ✅ Yes' : ' ❌ No'}
                      </span>
                    </div>
                    <div>
                      <strong>API Key Length:</strong>{' '}
                      {result.data.apiKeyLength || 0}
                    </div>
                    <div>
                      <strong>Environment:</strong> {result.data.nodeEnv}
                    </div>
                    <div>
                      <strong>API Key Prefix:</strong>{' '}
                      {result.data.apiKeyPrefix || 'None'}
                    </div>
                  </div>
                ) : (
                  <div>
                    {result.data.success && result.data.place ? (
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Place Name:</strong>{' '}
                          {result.data.place.displayName?.text || 'N/A'}
                        </div>
                        <div>
                          <strong>Address:</strong>{' '}
                          {result.data.place.formattedAddress || 'N/A'}
                        </div>
                        <div>
                          <strong>Rating:</strong>{' '}
                          {result.data.place.rating || 'N/A'}
                        </div>
                        <div>
                          <strong>Reviews:</strong>{' '}
                          {result.data.place.reviews?.length || 0}
                        </div>
                        <div>
                          <strong>Photos:</strong>{' '}
                          {result.data.place.photos?.length || 0}
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-600">
                        <strong>API returned error:</strong>{' '}
                        {result.data.error || 'Unknown error'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Raw Response */}
            <details className="mt-4">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                📋 View Raw Response
              </summary>
              <pre className="mt-2 p-3 bg-gray-800 text-green-400 rounded text-xs overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">
          🔍 Debugging Instructions:
        </h3>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>
            First, click "Check Environment" to verify your API key is
            configured
          </li>
          <li>
            Then click "Test Places API" with the default Place ID to test the
            API
          </li>
          <li>If that works, try with your kitchen's actual Place ID</li>
          <li>Check the browser console for detailed logs</li>
          <li>
            If you get errors, check the "View Raw Response" section for details
          </li>
        </ol>
      </div>

      {/* Console Reminder */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> Open your browser's Developer Tools (F12) and
          check the Console tab for detailed debugging information while running
          these tests.
        </p>
      </div>
    </div>
  )
}
