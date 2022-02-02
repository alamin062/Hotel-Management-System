const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const contactSchema = require("./../Models/ContactSchema");
const ContactUs = new mongoose.model("ContactUs", contactSchema);
const employeeSchema = require("./../Models/EmployeeSchema");
const Employees = new mongoose.model("Employees", employeeSchema);
const SignupSchema = require("./../Models/SignupSchema");
const Signup = new mongoose.model("Signup", SignupSchema);
const roomSchema = require("./../Models/RoomSchema");
const Room = new mongoose.model("Room", roomSchema);
const customerSchema = require("./../Models/CustomerSchema");
const Customer = new mongoose.model("Customer", customerSchema);

class BackEndController {
   static getContact1 = async (req, res) => {
      res.render("ContactPage");
   };
   //To get data from database
   static getContact = async (req, res) => {
      try {
         const { name, email, phone, massage } = req.body;
         const newContact = new ContactUs({
            name: name,
            email: email,
            phone: phone,
            massage: massage,
         });
         const result = await newContact.save();
         res.redirect("/home");
      } catch (err) {
         console.log(err);
      }
   };
   static getHome = async (req, res) => {
      res.render("HomePage");
   };
   static getPayment = async (req, res) => {
      try {
         const result = await Customer.findById(req.params.id);
         res.render("PaymentPage", {data: result});
      } catch (err) {
         console.log(err);
      }
   };
   /*static postTransection = async (req, res) => {
      try {
         console.log(req.body);
         const { transection_id, payment_id, name, phone, payment_status } = req.body;
         const newPayment = new Payment({
            transection_id:transection_id,
             payment_id:payment_id,
              name: name,
             phone: phone,
            payment_status:payment_status,
         });
         const result = await newPayment.save();
         res.redirect("/payment/"+req.params.id);
      } catch (err) {
         console.log(err);
      }
   }; */
   static postPayment = async (req, res) => {
      res.redirect("/payment/"+req.params.id);
   };
   static getCheakout = async (req, res) => {
      try {
         const result = await Customer.find();
         const d = result.length;
         res.render("CheakoutPage", {data: result[d-1]});
      } catch (err) {
         console.log(err);
      }
   };
   static getBook = async (req, res) => {
      res.render("BookNowPage");
   };
   static getAbout = async (req, res) => {
      res.render("AboutPage");
   };

   //This part of code for post data in customer table from customer form
   static getForm = async (req, res) => {
      try {
         const { room_id, name, address,room_type, price, email, phone, guest,night,cheakin,cheakout} = req.body;
         const newCustomer = new Customer({
            room_id:room_id,
            name: name,
            address: address,
            room_type:room_type,
            price:price,
            email: email,
            phone: phone,
            guest:guest,
            night:night,
            cheakin:cheakin,
            cheakout:cheakout
         });
         const result = await newCustomer.save();
         //const result1 = await Customer.findById(room_id);
         //console.log(req.body);
         //console.log(req.body.hidden_url);
         //res.render("CustomerForm")
         res.redirect("/checkout");
      } catch (err) {
         console.log(err);
      }
   };

   // to get cutomer data from customer table
   static getCustomerInfo = async (req, res) => {
      try {
         const result = await Customer.find();
         res.render("CustomerInfoPage", { data: result });
      } catch (err) {
         console.log(err);
      }
   };

    // to get cutomer data from customer table
   static getEmployeeInfo = async (req, res) => {
      try {
         const result = await Employees.find();
         res.render("EmployeeInfoPage", { data: result });
      } catch (err) {
         console.log(err);
      }
   };

   // To save employee information in employee table
   static createEmployeeInfo1 = async (req, res) => {
      try {
         const { name, designation, email, phone, address } = req.body;
         const newEmployee = new Employees({
            name: name,
            designation: designation,
            email: email,
            phone: phone,
            address: address,
         });
         const result = await newEmployee.save();
         res.redirect("/employee");
      } catch (err) {
         console.log(err);
      }
   };

   // To render booking_info_page
   static getBookingInfo = async (req, res) => {
      res.render("BookingInfoPage");
   };

   // To render room_page
   static getRoom = async (req, res) => {
      res.render("RoomPage");
   };
   // To render Gallary_page
   static getGallary = async (req, res) => {
      res.render("GallaryPage");
   };

   // To render Sign_up_page
   static getSignup = async (req, res) => {
      res.render("SignupPage");
   };

   // To save user data when they Sign Up
   static getSignup1 = async (req, res) => {
      try {
         const hashPassword = await bcrypt.hash(req.body.password, 10);
         const { name, username, email } = req.body;
         const newSignup = new Signup({
            name: name,
            username: username,
            email: email,
            password: hashPassword,
         });
         const result = await newSignup.save();
         res.status(500).json({
            massage: "Signup successfully",
         });
      } catch (err) {
         console.log(err);
      }
   };

   // To render login_page
   static getLogin = async (req, res) => {
      res.render("LoginPage");
   };

   // To cheak user authentication
   static getLogin1 = async (req, res) => {
      try {
         const user = await Signup.find({ username: req.body.username });
        // console.log(user);
         if (user && user.length > 0) {
           const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);
            if (isValidPassword) {
              const token = jwt.sign(
                  {
                     username: user[0].username,
                     userId: user[0]._id,
                  }, process.env.JWT_SECRET,{
                     expiresIn: '1h'
                  });
                  console.log(token);
              
               res.status(200).json({
                  //access_token: token,
                  massage: "Login successfully",
               });
            } else {
               res.status(401).json({
                  error: "Authentication faild",
               });
            }
         } else {
            res.status(401).json({
               error: "Authentication faild",
            });
         }
      } catch (err) {
         res.status(401).json({
            error: "Authentication faild",
         });
      }
   };

   // Find user massages from contact table and display on admin panel
   static getAdmin = async (req, res) => {
      try {
         const result = await ContactUs.find();
         res.render("AdminDashboard", { data: result });
      } catch (err) {
         console.log(err);
      }
   };

   //get room's information and display in customer form
   static getRoom1 = async (req, res) => {
      try {
         const result = await Room.findById(req.params.id);
         res.render("CustomerForm", {data: result})
      } catch (err) {
         console.log(err);
      }
   };

   // get room's information and display on room page
   static getRoom = async (req, res) => {
      try {
         const result = await Room.find();
         //console.log(req.params.id);
         res.render("RoomPage", { data: result });
      } catch (err) {
         console.log(err);
      }
   };

   //Thia part of code to find a specific massage and delete that massage
   static DeleteMassage = async (req, res) => {
      try {
         const result = await ContactUs.findByIdAndDelete(req.params.id);
         //console.log(req.params.id);
         res.redirect("/admin");
      } catch (err) {
         console.log(err);
      }
   };

   //To find massage and render that massage in admin page
   static getMassage = async (req, res) => {
      try {
         const result = await ContactUs.findById(req.params.id);
         res.render("MassagePage", { data: result });
      } catch (err) {
         console.log(err);
      }
   };
}

module.exports = BackEndController;
