import { FRONTEND_URL, SEND_EMAIL_PASS, SEND_EMAIL_USER } from "../config";

import nodemailer from "nodemailer";

const sendEMail = async (
  name: string,
  email: string,
  token: string,
  isVerification: boolean
) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: SEND_EMAIL_USER,
        pass: SEND_EMAIL_PASS,
      },
    });

    const emailHtml = ` <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="color: rgb(34, 34, 34); font-family: Helvetica, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border-collapse: separate; width: 882px;"><tbody><tr><td valign="top" style="margin: 0px; font-size: 14px; vertical-align: top;"> </td><td width="500" valign="top" style="margin: 0px auto !important; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 500px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width: 500px; background: rgb(255, 255, 255); border: 0px; font-family: Helvetica, sans-serif;"><tbody><tr><td valign="top" style="margin: 0px; font-size: 12px; vertical-align: top;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 500px;"><tbody><tr><td style="margin: 0px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px; color: rgb(255, 255, 255); font-weight: bold; text-align: center; width: 500px;"><tbody><tr><td style="margin: 0px;"><img width="105" height="27" src="https://ci5.googleusercontent.com/proxy/wfx3hGgQ6s4QgvQadM2yNdf6xPbCtQuJhLMskQeMqz68acU6jGJ4sJujesSLHqmggRH9dB5WEQYurqzXkcqyOFdSRQhOJpJ0JEofdN-6ELNCrU4xoh0=s0-d-e1-ft#https://d36jcksde1wxzq.cloudfront.net/saas-mega/DockerWhaleIcon.png" class="CToWUd" data-bit="iit"></td></tr></tbody></table></td></tr><tr><td valign="top" style="margin: 0px; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 10px 20px 20px; border-bottom: none;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; width: 460px; box-sizing: border-box;"><tbody><tr><td align="left" valign="top" style="margin: 0px; font-size: 14px; vertical-align: top;"><h1 style="font-size: 16px; font-weight: bold; margin: 0px;"></h1><div style="font-size: 30px;">Hi ${name},</div><div style="margin: 18px 0px;">${
      isVerification
        ? "Thanks for creating a account on Stackinfinite. Please verify your email address by clicking the button below. This link will expires in 15 minutes."
        : "Forget your password by clicking the button below. This link will expires in 15 minutes."
    }</div><div style="padding: 10px 0px; text-align: left; vertical-align: top;"><a href="${FRONTEND_URL}/${
      isVerification ? "email-verify" : "forgot-password-verify"
    }/${token}" style="color: rgb(255, 255, 255); box-sizing: border-box; text-decoration: none; background-color: rgb(0, 123, 255); border: 1px solid rgb(0, 123, 255); border-radius: 4px; font-size: 16px; font-weight: bold; margin: 0px; padding: 9px 25px; display: inline-block; letter-spacing: 1px;">${
      isVerification ? "Verify email address" : "Forget your password"
    }</a></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`;

    const info = await transporter.sendMail({
      from: SEND_EMAIL_USER,
      to: email,
      subject: isVerification
        ? "Email for verification "
        : "Email for forgot password",
      html: emailHtml,
    });
    const url = `"Preview URL: %s", ${nodemailer.getTestMessageUrl(info)}`;
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default sendEMail;
