import Owner from "../../model/ownerModel.js";
import Signup_functions from "../../helper/Signup_functions.js";
import bcrypt from "bcrypt"





const signUp = ((req, res) => {
    try {
        res.render("ownerSignup")

    } catch (error) {
        console.log(error);
    }

})

//////////// STARTED OTP //////////


let ownerOtp = []

const signupValidate = async (req, res) => {
    try {

        const { name, email, phone, password, password2, upi } = req.body
        const emailExist = await Owner.findOne({ email: email })
        const upiExist = await Owner.findOne({ upi: upi })
        const phoneExist = await Owner.findOne({ phone: phone })
        const valid = Signup_functions.validate(req.body, true)

        if (emailExist) {

            return res.status(409).json({ error: "The owner already Exists please Login" })
        }
        else if (upiExist) {

            return res.status(409).json({ error: "The owner with same upi already Exist please Re-check" })
        }
        else if (phoneExist) {

            return res.status(409).json({ error: "The owner with same Phone Number already Exist please Re-check" })
        }
        else if (!valid.isValid) {

            return res.status(400).json({ error: valid.errors })
        }
        else {

            req.session.ownerDetails = {
                name,
                email,
                phone,
                password,
                upi,
            }

            return res.status(200).end()
        }
    } catch (error) {
        console.log(error);
    }
}


const enterOtp = async (req, res) => {
    try {
        const email = req.session.ownerDetails.email
        const generateOtp = Signup_functions.generateOTP()

        ownerOtp.push(generateOtp)
        Signup_functions.sendOTP(email, generateOtp)
        Signup_functions.otpRemoval(ownerOtp, generateOtp, 31000)

        res.render("ownerOtp")

    } catch (error) {
        console.log(error);
    }
}


const verifyOtp = async (req, res) => {
    try {
        const enteredOtp = req.body.otp;
        let i
        let otpMatched = false
        console.log(enteredOtp)
        for (i = 0; i < ownerOtp.length; i++) {

            if (ownerOtp[i] == enteredOtp) {
                otpMatched = true

                ownerOtp.splice(i, 1)

                const { name, email, phone, password, upi } = req.session.ownerDetails
                const hashedPassword = await Signup_functions.passwordHash(password);

                const owner = new Owner({
                    name,
                    email,
                    phone,
                    upi,
                    password: hashedPassword,

                })

                delete req.session.ownerDetails

                try {
                    await owner.save();
                    break

                } catch (error) {
                    console.log(error);
                    return
                }
            }
        }

        if (otpMatched) {
            return res.status(200).end()
        } else {
            return res.status(400).json({ error: "Invalid OTP" })
        }
    } catch (error) {
        console.log(error);
    }
};

/////////////Ended OTP///////



export default {
    signUp,
    signupValidate,
    enterOtp,
    verifyOtp,
}