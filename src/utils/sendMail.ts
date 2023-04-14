import nodemailer from 'nodemailer'

const mailTransporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'API_VERIFY@outlook.com',
    pass: 'AQ8@hRCS',
  },
})

export const SendEmail=(message:string)=>{
const mailDetails = {
  from: 'API_VERIFY@outlook.com',
  to: 'mahesh.bhadane@torinit.ca',
  subject: 'Task Added ',
  text: message,
}

mailTransporter.sendMail(mailDetails, function (err: any) {
  if (err) {
    console.log('Error Occurs' + err)
  } else {
    console.log('Email sent successfully')
  }
})
}