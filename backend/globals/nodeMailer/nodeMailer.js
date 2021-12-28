 //Requerimos el paquete
 var nodemailer = require('nodemailer');

 //Creamos el objeto de transporte
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'nodemailersmtptest@gmail.com',
     pass: 'nodemailer123'
   }
 });
 
 var mensaje = "Enviando correo desde el backend";
 
 var mailOptions = {
   from: 'nodemailersmtptest@gmail.com',
   to: 'nodemailersmtptest@gmail.com',
   subject: 'test Zarego',
   text: mensaje
 };
const sendMail = () =>{
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}


module.exports = sendMail; 