import { useState, useEffect } from 'react'

const TRIAL_LIMIT = 2
const TRIAL_STORAGE_KEY = 'briefblip_trial_usage'

export function useTrialUsage() {
  const [trialCount, setTrialCount] = useState(() => {
    const stored = localStorage.getItem(TRIAL_STORAGE_KEY)
    return stored ? parseInt(stored, 10) : 0
  })

  const incrementTrialUsage = () => {
    const newCount = trialCount + 1
    setTrialCount(newCount)
    localStorage.setItem(TRIAL_STORAGE_KEY, newCount.toString())
  }

  const hasTrialsLeft = trialCount < TRIAL_LIMIT
  const remainingTrials = TRIAL_LIMIT - trialCount

  return {
    trialCount,
    incrementTrialUsage,
    hasTrialsLeft,
    remainingTrials
  }
}