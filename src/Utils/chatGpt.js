const postChatGpt = async (formData) => {
  let data
  // data = await fetch('http://localhost:8080', {
  //   method: "POST",
  //   body: JSON.stringify(formData)
  // })
  // .then(response => response.json())

  data = {
    id: 3,
    reasoning: "This is best",
    internal: "This is the best product"
  }

  return data
}

export default postChatGpt