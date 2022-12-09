const nodemailer = require("nodemailer");

module.exports.sendEmail = async(options)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "mohamed.ahma40@gmail.com", // generated ethereal user
          pass: "vynfwwrxxwbxbyky", // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: 'Mo <mohamed.ahma40@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html:`

        <h2>${options.message}</h2>
        <a href="http://localhost:3000/verify/${options.token}">verify</a>
        

        `, // html body
      },(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
      });
    //   console.log(info)
}



