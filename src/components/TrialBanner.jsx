function TrialBanner({ remainingTrials }) {
    if (remainingTrials <= 0) return null
  
    return (
      <div className="bg-blue-600 text-white px-4 py-2 text-center">
        <p>
          Try BriefBlip for free! {remainingTrials} free {remainingTrials === 1 ? 'summary' : 'summaries'} remaining
        </p>
      </div>
    )
  }
  
  export default TrialBanner