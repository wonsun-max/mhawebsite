'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const UserOnboarding = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [koreanName, setKoreanName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('STUDENT') // Default role
  const [grade, setGrade] = useState<number | ''>('')
  const [nickname, setNickname] = useState('') // Add nickname state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.koreanName) {
      // If user is authenticated and already has a koreanName, redirect away from onboarding
      router.push('/') // Or to a profile page
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/onboard', {
        method: 'PATCH', // Changed to PATCH as per API route
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ koreanName, birthdate, gender, role, grade: role === 'STUDENT' ? grade : null, nickname }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save profile')
      }

      // Update the session to reflect the new user data
      await update({ koreanName, birthdate, gender, role, grade: role === 'STUDENT' ? grade : null, nickname })

      router.push('/') // Redirect to homepage after onboarding
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin') // Redirect unauthenticated users to login
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bottom from-slate-950 via-indigo-950 to-slate-900 p-4"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="koreanName" className="block text-sm font-medium text-gray-700">Korean Name</label>
            <input
              type="text"
              id="koreanName"
              value={koreanName}
              onChange={(e) => setKoreanName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="PARENT">Parent</option>
              <option value="GUEST">Guest</option>
            </select>
          </div>

          {role === 'STUDENT' && (
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
              <input
                type="number"
                id="grade"
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value) || '')}
                required
                min="1"
                max="12"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname (for anonymous posts)</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Optional nickname"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default UserOnboarding
