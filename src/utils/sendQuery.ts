import axios from "axios"

async function sendQuery(content: string, title?: string) {
  const res = await axios.post("http://8.130.132.134:8000/predict", {
    content: content,
    title: title
  })

  return res.data
}

export default sendQuery
