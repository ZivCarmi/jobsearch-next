// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const sendLoginData = createAsyncThunk(
//   "login",
//   async (credentials, { rejectWithValue }) => {
//     const errors = {};

//     if (credentials.email === "") {
//       errors.email = "Email field is required";
//     }

//     if (credentials.password === "") {
//       errors.password = "Password field is required";
//     }

//     if (Object.keys(errors).length > 0) {
//       return { errors };
//     }

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         body: JSON.stringify(credentials),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       const responseJson = await response.json();

//       localStorage.setItem("persist", credentials.persist);

//       return responseJson;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const sendRegisterData = createAsyncThunk(
//   "register",
//   async (userData, { rejectWithValue }) => {
//     const errors = {};

//     if (!userData.type) {
//       errors.type = "Please select one of the above options";
//     } else if (userData.type !== "seeker" && userData.type !== "employer") {
//       errors.type = "Please select a valid option";
//     }

//     if (userData.email === "") {
//       errors.email = "Email field is required";
//     } else if (!userData.email.includes("@")) {
//       errors.email = "Email Address must be in a valid form";
//     }

//     if (userData.password === "") {
//       errors.password = "Password field is required";
//     } else if (userData.password.length < 6) {
//       errors.password = "Password must be at least 6 digits long";
//     }

//     if (Object.keys(errors).length > 0) {
//       return { errors };
//     }

//     try {
//       const response = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         body: JSON.stringify(userData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseJson = await response.json();

//       return responseJson;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue(error.response.data);
//     }
//   }
// );
