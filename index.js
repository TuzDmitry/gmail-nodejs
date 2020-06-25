

////1)импорт экспресс
var express = require('express');

////5)импорт нодмэйлер
const nodemailer = require("nodemailer");

/////7) импортируем корс
const cors=require('cors')

/////9) импортируем бодипарсер
const bodyParser=require('body-parser')



// 6)create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    //         // port: 587,
    //         // secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: "**************", // generated ethereal user
        pass: "*************", // generated ethereal password
    },
});

///2)вызвали конструктор - созд прилагу
const app = express();

////8)
app.use(cors())

////10)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

////3)настройка роутов.- если придет гет запрос на базовый урл, то верни Хелло ворлд
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/dimatuz', async function (req, res) {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'from senders', // sender address
        to: "dimatuz94@gmail.com", // list of receivers
        // to: "aceg815@gmail.com", // list of receivers
        subject: "Test APP", // Subject line
        //text: "This is mail from form", // plain text body
        html: "<b>This is text mail from such user form</b>", // html body
    });
    res.send('My name is Dima Tuz!');
});
app.post('/sendformdata', async function (req, res) {
    let {name, email, message}=req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: name, // sender address
        to: "dimatuz94@gmail.com", // list of receivers
        subject: "You Got Feedback Form", // Subject line
        //text: "This is mail from form", // plain text body
        html:
            `<div><b>Сообщение с портфолио:</b></div>
                <div><span>от: ${name}</span></div>
                <div><span>email: ${email}</span></div>
                <div><span>текст: ${message}</span></div>
`, // html body
    });
    res.send(`Thank you, dear ${name}! The message is sent successful!`);
});


////4)старт приложения, порт, сообщине когда стартануло приложение
app.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});