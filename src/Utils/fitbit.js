import envData from '../env.json'

const getFitbitData = async () => {
  
  const data = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
    method: "GET",
    headers: {"Authorization": "Bearer " + envData.access_token}
  })
  .then(response => response.json())

  return {
    ...data,
    sleep:[
      {
        "date": "2023-05-25",
        "startTime": "23:00:00",
        "endTime": "07:00:00",
        "duration": 480,
        "minutesAsleep": 420,
        "minutesAwake": 60,
        "minutesToFallAsleep": 10,
        "restlessCount": 15,
        "restlessDuration": 25,
        "awakeCount": 5,
        "awakeDuration": 60,
        "timeInBed": 480,
        "efficiency": 87,
        "sleepStages": {
          "wake": 60,
          "light": 240,
          "deep": 120,
          "rem": 60
        }
      }
    ]
  }
}

export default getFitbitData