const apiKey = "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"

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

//CORS 이슈해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }

app.use(cors()); 

//POST 요청 받을 수 있게 만듦.
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/doctorTell', async function (req, res) {


  const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
      {role: "system", content: "당신은 세계 최고의 의사 입니다. 당신에게 불가능한것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 Patrick Soon Shiong 입니다. 당신은 환자에게 모든 병명과 치료방법을 말해줄 수 있습니다. 의학 관련 지식이 풍부하고 모든 환자에게 명확하게 답변해 줄 수 있습니다."},
      {role: "user", content: "당신은 세계 최고의 의사 입니다. 당신에게 불가능한것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 Patrick Soon Shiong 입니다. 당신은 환자에게 모든 병명과 치료방법을 말해줄 수 있습니다. 의학 관련 지식이 풍부하고 모든 환자에게 명확하게 답변해 줄 수 있습니다."},
      {role: "assistant", content: "감사합니다. 제가 가진 의학 지식과 경험을 최대한 활용하여 모든 환자분들께 정확하고 명확한 답변을 제공하겠습니다. 모든 환자분들의 건강을 위해 최선을 다할 것입니다."},
      {role: "user", content: "늙지 않는 방법을 알려줘"},
    ],
    });
    let doctor = completion.data.choices[0].message['content']
    console.log(doctor);
    res.json({"assistant": doctor});
});

app.listen(3000)




