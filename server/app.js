const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { auth, db } = require("./db");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/userregistration", async (req, res) => {
  const { phoneNumber, UserCode } = req.body;

  try {
    const userCodeDetails = db.collection("UserCodes").doc(phoneNumber);
    await userCodeDetails.get().then(async (doc) => {
      if (doc.exists) {
        const UserCoderecord = doc.data();
        console.log("user->>", UserCoderecord.UserCode);
        if (UserCode == UserCoderecord.UserCode) {
          const userRecord = await auth.createUser({
            phoneNumber,
          });
          console.log("User Added", userRecord.uid);
          const documentRef = await db.collection("admin").add({
            userPhoneNumber: `${phoneNumber}`,
            UserCode: `${UserCode}`,
            userUid: `userRecord.uid`,
          });
          console.log(req.body);
          console.log(`Document written with ID: ${documentRef.id}`);
          res.status(201).json({
            message: "User registered successfully",
            userReg: true,
          });
        } else {
          return res.status(403).json({
            message: "invalid Code",
            userReg: false,
          });
        }
      } else {
        return res.status(403).json({
          message: "Code Not Generated",
          userReg: false,
        });
      }
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    if (error.code === "auth/invalid-phone-number") {
      res
        .status(400)
        .json({ error: "Invalid phone number format", userReg: false });
    } else {
      res
        .status(500)
        .json({ error: "user exists", userReg: false });
    }
  }
});
function generateRandomCode(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCode += charset.charAt(randomIndex);
  }

  return randomCode;
}
app.post("/userCode", async (req, res) => {
  const { phoneNumber } = req.body;
  const documentDetails = db.collection("UserCodes").doc(phoneNumber);
  documentDetails.get().then(async (doc) => {
    if (doc.exists) {
      res.json({ UsercodeIn: true, usercode: "exists" });
      return;
    } else {
      const randomCode = generateRandomCode(5);
      try {
        const documentRef = await db
          .collection("UserCodes")
          .doc(phoneNumber)
          .set({
            userPhoneNumber: phoneNumber,
            UserCode: randomCode,
          });

        console.log(`Document written with ID: ${documentRef.id}`);
        console.log(req.body);
        console.log(`usercode generated`);
      } catch (error) {
        console.error("Error creating new userCode:", error);
        if (error.code === "auth/invalid-phone-number") {
          res
            .status(400)
            .json({ error: "Invalid phone number format", phoneNumber: false });
        } else {
          res
            .status(500)
            .json({ error: "Error creating new user", userExists: true });
        }
      }
    }
  });
});
app.post("/userdetails",(req,res) => {
    const{name,mobile,address,star,familyName,pincode,area,dob}=req.body;
    try{
        var doc=db.collection('memberDetails').doc(familyName).set({
            memberName:name,
            mobileNo:mobile,
            memberAddress:address,
            memberDob:dob,
            astroStar:star,
            pinCode:pincode,
            memberArea:area
        })
        console.log("added ",doc);
        res.json({message:"added",success:true})
    }catch(error){
        console.log(error);
        res.json({message:"Error on submiting",success:false})
    }
})
app.post("/delete", (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
