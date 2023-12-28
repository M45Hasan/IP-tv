const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    employeeInfo: {
      nid: {
        sr: { type: String, unique: true },

        url: { type: String },
      },
      officeId: String,

      bank: {
        acName: String,
        acNum: String,
        branch: String,
        bankName: String,
        routeNum: String,
      },
      tinNum: String,
      bloodGrp: String,
      address: {
        permanent: String,
        present: String,
      },
      emrgencyCont: {
        relation: String,
        phoneNum1: String,
        phoneNum2: String,
      },
      myLeave: {
        sick: Number,
        casual: Number,
        annual: Number,
      },
    },
    position: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full-Stack",
        "Senior Frontend",
        "Senior Backend",
        "Senior Full-Stack",
        "Senior UI/UX",
        "Senior Motion Designer",
        "Senior Graphic Designer",
        "Junior Frontend",
        "Junior Backend",
        "Junior Full-Stack",
        "Junior UI/UX",
        "Junior Motion Designer",
        "Junior Graphic Designer",
        "Manager",
        "Ass.Manager",
        "CEO",
        "UI/UX",
        "Motion Designer",
        "Graphic Designer",
        "Director",
        "Jr.executive",
        "Sr.executive",
        "Executive",
        "Intern",
        "Client Service",
        "Operation",
        "Client Service & Operation",
        "Clark",
        "Driver",
        "Guard",
      ],
    },
    department: {
      type: String,
      enum: [
        "Web Development",
        "Salles & Marketing",
        "HR & Admin",
        "BTL",
        "IT",
        "Safety & Security",
        "Business Development ",
        "Accounts ",
      ],
    },
    role: {
      type: String,
      enum: [
        "HO",
        "HD",
        "HRO",
        "BTL",
        "Business Development ",
        "Team Leader",
        "Admin",
        "User",
        "Developer",
      ],
    },

    myAssignProject: [
      {
        project: { type: Schema.Types.ObjectId, ref: "Project" },
        taskList: [{ type: String }],
        assignDate: Date,
        lastDate: String,
        myProgress: Number,
        reviewTask: [{ type: String }],
      },
    ],

    leave: [{ type: Schema.Types.ObjectId, ref: "Leave" }],
    salary: {
      total: Number,
      providentFund: Number,
      paySlip: [{ type: Schema.Types.ObjectId, ref: "Salary" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
