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
app.get("/memberdetails", (req, res) => {
  var docRef = db.collection('memberDetails');
  try {
      docRef.get().then((querySnapshot) => {
          var memberDetails = [];
          querySnapshot.forEach((doc) => {
              if (doc.exists) {
                  var data = doc.data();
                  console.log("Document data:", data);
                  memberDetails.push({
                      memberName: data.memberName,
                      mobileNo: data.mobileNo,
                      familyName:data.family,
                      memberAddress: data.memberAddress,
                      memberDob: data.memberDob,
                      astroStar: data.astroStar,
                      pinCode: data.pinCode,
                      memberArea: data.memberArea,
                  });
              } else {
                  console.log("No such document!");
              }
          });
          res.json({
              message: 'Member Details Found',
              memberdata: memberDetails
          });
      });
  } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/memberrequestname", async (req, res) => {
  // Assuming familyName is passed in the request body
  const memberName = req.body.memberName;

  if (!memberName) {
      return res.status(400).json({ error: "familyName parameter is required in the request body" });
  }

  try {
      // Retrieve documents with the specified familyName
      const querySnapshot = await db.collection('memberDetails').where('memberName', '==', memberName).get();
      const memberDetails = [];

      querySnapshot.forEach((doc) => {
          if (doc.exists) {
              const data = doc.data();
              memberDetails.push({
                  memberName: data.memberName,
                  mobileNo: data.mobileNo,
                  memberAddress: data.memberAddress,
                  memberDob: data.memberDob,
                  astroStar: data.astroStar,
                  pinCode: data.pinCode,
                  memberArea: data.memberArea
              });
          }
      });

      res.json({ message: "Member Details Found", success: true, memberDetails });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});;
app.get("/memberrequestfamily", async (req, res) => {
  // Assuming familyName is passed in the request body
  const familyName = req.body.family;

  if (!familyName) {
      return res.status(400).json({ error: "familyName parameter is required in the request body" });
  }

  try {
      // Retrieve documents with the specified familyName
      const querySnapshot = await db.collection('memberDetails').where('familyName', '==', familyName).get();
      const memberDetails = [];

      querySnapshot.forEach((doc) => {
          if (doc.exists) {
              const data = doc.data();
              memberDetails.push({
                  memberName: data.memberName,
                  mobileNo: data.mobileNo,
                  memberAddress: data.memberAddress,
                  memberDob: data.memberDob,
                  astroStar: data.astroStar,
                  pinCode: data.pinCode,
                  memberArea: data.memberArea
              });
          }
      });

      res.json({ message: "Member Details Found", success: true, memberDetails });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/memberrequestmobile", async (req, res) => {
  // Assuming familyName is passed in the request body
  const mobileNo = req.body.mobile;

  if (!mobileNo) {
      return res.status(400).json({ error: "familyName parameter is required in the request body" });
  }
  try {
      // Retrieve documents with the specified familyName
      const querySnapshot = await db.collection('memberDetails').where('mobileNo', '==', mobileNo).get();
      const memberDetails = [];

      querySnapshot.forEach((doc) => {
          if (doc.exists) {
              const data = doc.data();
              memberDetails.push({
                  memberName: data.memberName,
                  mobileNo: data.mobileNo,
                  memberAddress: data.memberAddress,
                  memberDob: data.memberDob,
                  astroStar: data.astroStar,
                  pinCode: data.pinCode,
                  memberArea: data.memberArea
              });
          }
      });

      res.json({ message: "Member Details Found", success: true, memberDetails });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/userregistration", async (req, res) => {
  const { phoneNumber, UserCode } = req.body;
  console.log(req.body)
  try {
    const userCodeDetails = db.collection("UserCodes").doc(phoneNumber);
    await userCodeDetails.get().then(async (doc) => {
      if (doc.exists) {
        const UserCoderecord = doc.data();
        console.log("user->>", UserCoderecord);
        if (UserCode == UserCoderecord.userCode) {
          const userNumber="+91"+phoneNumber
          const userRecord = await auth.createUser({
            userNumber,
          });
          console.log("User Added", userRecord.uid);
          const documentRef = await db.collection("admin").add({
            userPhoneNumber: `${phoneNumber}`,
            UserCode: `${UserCode}`,
            userUid: `${userRecord.uid}`,
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

  try {
    const doc = await documentDetails.get();

    if (doc.exists) {
      return res.json({ userCodeExists: true, userCode: "exists" });
    } else {
      const randomCode = generateRandomCode(5);
      await documentDetails.set({
        userPhoneNumber: phoneNumber,
        userCode: randomCode,
      });
      console.log(`User code generated for ${phoneNumber}: ${randomCode}`);
      return res.status(200).json({ userCodeExists: false, userCode: randomCode });
    }
  } catch (error) {
    console.error("Error checking/updating user code:", error);

    if (error.code === "auth/invalid-phone-number") {
      return res.status(400).json({ error: "Invalid phone number format", phoneNumber: false });
    } else {
      return res.status(500).json({ error: "Error checking/updating user code", userCodeExists: true });
    }
  }
});

app.post("/userdetails",(req,res) => {
    const{name,mobile,address,star,familyName,pincode,area,dob}=req.body;
    console.log(req.body);
    try{
        var doc=db.collection('memberDetails').add({
            memberName:name,
            mobileNo:mobile,
            memberAddress:address,
            memberDob:dob,
            astroStar:star,
            pinCode:pincode,
            family:familyName,
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
