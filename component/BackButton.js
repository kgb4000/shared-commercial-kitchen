'use client' // Mark as a Client Component

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      ← Go Back
    </button>
  )
}
