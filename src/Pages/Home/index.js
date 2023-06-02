import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import getFitbitData from '../../Utils/fitbit'
import postChatGpt from '../../Utils/chatGpt'

import { useAssessment } from "../../Context/AssessmentContext";

import styles from './styles.module.css'

const defaultDemographics = {
  occupation: ""
}

const defaultBreathing = {
  snoringStatus: "",
  snoringNoise: "",
  breathingStop: "",
  choking: ""
}

const defaultDaytime = {
  sleepy: "",
  fatigue: "",
  concentration: "",
  memoryProblem: "",
  inappropriateSleep: ""
}

const defaultPhysicalHealth = {
  obesity: "",
  bloodPressure: "",
  presentmedication: "",
  smokeStatus: "",
  excerciseStatus: ""
}

const defaultFitbitData = {
  sleep: {
    date: "",
    startTime: "",
    endTime: "",
    duration: 0,
    minutesAsleep: 0,
    minutesAwake: 0,
    minutesToFallAsleep: 0,
    restlessCount: 0,
    restlessDuration: 0,
    awakeCount: 0,
    awakeDuration: 0,
    timeInBed: 0,
    efficiency: 0,
    sleepStages: {
      wake: 0,
      light: 0,
      deep: 0,
      rem: 0
    }
  },
  user: {
    weight: 0,
    age: 0,
    gender: "",
    height: 0
  }
}

const Home = () => {
  const { addAssessment, items } = useAssessment();
  const [assessmentStatus, setAssessmentStatus] = useState(false)
  const [demographics, setDemographics] = useState(defaultDemographics)
  const [breathing, setBreathing] = useState(defaultBreathing)
  const [daytime, setDaytime] = useState(defaultDaytime)
  const [physicalHealth, setPhysicalHealth] = useState(defaultPhysicalHealth)
  const [fitbitData, setFitbitData] = useState(defaultFitbitData)
  const [productAssessment, setProductAssessment] = useState({})

  const navigate = useNavigate()
  
  // useEffect(() => {
  //   assessmentStatus && navigate('/')
  // }, [assessmentStatus])



  const handleDemographicFormChange = (e) => {
    setDemographics({ ...demographics, [e.target.name]: e.target.value })
  }

  const handleBreathingFormChange = (e) => {
    setBreathing({ ...breathing, [e.target.name]: e.target.value })
  }

  const handleDaytimeFormChange = (e) => {
    setDaytime({ ...daytime, [e.target.name]: e.target.value })
  }

  const handlePhysicalHealthFormChange = (e) => {
    setPhysicalHealth({ ...physicalHealth, [e.target.name]: e.target.value })
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    console.log('demographics: ', demographics)
    console.log('breathing: ', breathing)
    console.log('daytime: ', daytime)
    console.log('fitbitData: ', fitbitData)
    const response = await postChatGpt({
      demographics,
      breathing,
      daytime,
      fitbitData
    })
    await setProductAssessment(response)

    await addAssessment(response)

    console.log('response: ', response)
    navigate(`/product/${response.id}`)
    // setErrors(validations(currentUser, users)) 
    // setIsSubmitting(true)
    // localStorage.setItem('user', JSON.stringify(currentUser))
    // localStorage.setItem('users', JSON.stringify(users))
  }

  const toggleAssessment = async () => {
    await setAssessmentStatus(async (current) => {
      console.log('current: ', current)
      if (current) {
        navigate('/products')
      }
      else {
        const fitBitData = await getFitbitData()
        console.log('fitBitData: ', fitBitData)
        const { sleep, user } = fitBitData
        const { age, gender, height, weight } = user
        setFitbitData({
          sleep: sleep[0],
          user: {
            age,
            gender,
            height,
            weight
          }
        })
      }
      return !current
    })
  }

  return (
    <>
    <div className={styles.bannerGroupContainer}>
      <div className={styles.bannerLeft}>
        <div className={styles.bannerTitle}>Good sleep means<br /> Good Health</div>
        <div className={styles.bannerDescription}>Sleep apnea is a sleep disorder characterized by pauses in breathing or shallow breathing during sleep. These pauses in breathing can last from a few seconds to minutes and can occur multiple times throughout the night. Sleep apnea is typically caused by the relaxation of the muscles in the throat, which obstructs the airway and restricts the flow of air.</div>
      </div>
      <div className={styles.bannerRight}></div>
    </div>

    <div className={styles.formGroupContainer}>
      <div className="text-center">
        <button
          className={styles.button}
          onClick={toggleAssessment}
        >
          {!assessmentStatus ? 'Assess your sleep quality' : 'Skip and view all products'}
        </button>
        {!assessmentStatus && (<div className={styles.assessButtonLabel}>This will connect to your smartwatch for collecting information related to your sleep patterns. Plus fill in some more details for accurate analysis.</div>)}
      </div>
    </div>
    
    
    {assessmentStatus && (<div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Assess the quality of your sleep</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >

          <label className={styles.formSectionLabels}>Demographic details:</label>
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Occupation</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDemographicFormChange}
                value={demographics.occupation}
                name="occupation"
                placeholder="Occupation"
              />
            </div>
          </div>

          <label className={styles.formSectionLabels}>Snoring and Breathing:</label>
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Do you snore regularly?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleBreathingFormChange}
                value={breathing.snoringStatus}
                name="snoringStatus"
                placeholder="Do you snore regularly?"
              />
            </div>
            <div>
              <label className="sr-only">If yes, do they sound low, medium, high?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleBreathingFormChange}
                value={breathing.snoringNoise}
                name="snoringNoise"
                placeholder="If yes, do they sound low, medium, high?"
              />
            </div>
            <div>
              <label className="sr-only">Have you ever been told that you briefly stop breathing or gasp for air during sleep?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleBreathingFormChange}
                value={breathing.breathingStop}
                name="breathingStop"
                placeholder="Have you ever been told that you briefly stop breathing or gasp for air during sleep?"
              />
            </div>
            <div>
              <label className="sr-only">Are you aware of any choking or snorting sounds during your sleep?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleBreathingFormChange}
                value={breathing.choking}
                name="choking"
                placeholder="Are you aware of any choking or snorting sounds during your sleep?"
              />
            </div>
          </div>

          <label className={styles.formSectionLabels}>Daytime Symptoms:</label>
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Do you often feel excessively sleepy?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDaytimeFormChange}
                value={daytime.age}
                name="age"
                placeholder="Do you often feel excessively sleepy?"
              />
            </div>
            <div>
              <label className="sr-only">Do you often feel fatigued during the day?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDaytimeFormChange}
                value={daytime.fatigue}
                name="fatigue"
                placeholder="Do you often feel fatigue during the day?"
              />
            </div>
            <div>
              <label className="sr-only">Have you experienced difficulty concentrating?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDaytimeFormChange}
                value={daytime.concentration}
                name="concentration"
                placeholder="Have you experienced difficulty concentrating?"
              />
            </div>
            <div>
              <label className="sr-only">Have you experienced any memory problems?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDaytimeFormChange}
                value={daytime.memoryProblem}
                name="memoryProblem"
                placeholder="Have you experienced any memory problems?"
              />
            </div>
            <div>
              <label className="sr-only">Have you unintentionally fallen asleep or felt drowsy in inappropriate situations (e.g., while working, driving, or watching TV)?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleDaytimeFormChange}
                value={daytime.inappropriateSleep}
                name="inappropriateSleep"
                placeholder="Have you felt drowsy in inappropriate situations (e.g., while working, driving, or watching TV)?"
              />
            </div>
          </div>

          <label className={styles.formSectionLabels}>Physical Health and Lifestyle Factors:</label>
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Do you have a history of obesity or being overweight?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handlePhysicalHealthFormChange}
                value={daytime.obesity}
                name="obesity"
                placeholder="Do you have a history of obesity or being overweight?"
              />
            </div>
            <div>
              <label className="sr-only">Have you been diagnosed with high blood pressure?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handlePhysicalHealthFormChange}
                value={daytime.bloodPressure}
                name="bloodPressure"
                placeholder="Have you been diagnosed with high blood pressure?"
              />
            </div>
            <div>
              <label className="sr-only">Are you currently taking any medications that may affect sleep or breathing?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handlePhysicalHealthFormChange}
                value={daytime.presentmedication}
                name="presentmedication"
                placeholder="Are you currently taking any medications that may affect sleep or breathing?"
              />
            </div>
            <div>
              <label className="sr-only">Do you smoke?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handlePhysicalHealthFormChange}
                value={daytime.smokeStatus}
                name="smokeStatus"
                placeholder="Do you smoke?"
              />
            </div>
            <div>
              <label className="sr-only">Do you excercise?</label>
              <input
                type="text"
                className={styles.input}
                onChange={handlePhysicalHealthFormChange}
                value={daytime.excerciseStatus}
                name="excerciseStatus"
                placeholder="Do you excercise?"
              />
            </div>
          </div>

          <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria1-hidden="true"
                />
                Assess
              </button>
            </div>
        </form>
      </div>
    </div>)}

    </>
  )
}

export default Home
