const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(express.json());
app.use(cors());

//For Localhost
const uploadPath = "C:/Users/user/Desktop/file_upload_in_cpanel/assets/image"; // Current Location / Path of Your Project.
// const imageApi = "C:/Users/user/Desktop/file_upload_in_cpanel/assets/image/my-image-file_dateVal_1724750054595_rickshaw.jpg";

/*
//For cPanel
const uploadPath = "/home/abcdcom/abcd.com/api3/assets/image"; // Current Location / Path of Your Project.
// const imageApi = "https://abcd.com/api3/assets/image/my-image-file_dateVal_1724753646937_WhatsApp%20Image%202024-08-22%20at%2012.29.07%20PM.jpeg";
*/

app.get("/", (req, res) => {
    res.send("Welcome to my website.");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    }
});

const imageUpload = multer({ storage: storage });

app.post('/upload', imageUpload.array("my-image-file"), (req, res) => {
    console.log('POST request received to /upload.');
    console.log('Axios POST body: ', req.body);
    res.send('Upload Successfully!');
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})






/* ----------------------------------------------------------------------------------------------------------------
 * Use This Code in your React Client Side 
 
import axios from 'axios';
import React, { useState } from 'react';

function Upload() {
    const [image, setImage] = useState(null);
    const handleClick = () => {
        axios.post('http://localhost:5000/upload', image)
            .then(res => {
                console.log('Axios response: ', res)
            })
    }
    const handleFileInput = (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
        setImage(formData);
        console.log(image);
    }
    console.log(image);

    return (
        <div className="App">
            <button onClick={handleClick}>Upload!</button>
            <input type="file" onChange={handleFileInput} />
        </div>
    );
}

export default Upload;

-----------------------------------------------------------------------------------------------------------------*/