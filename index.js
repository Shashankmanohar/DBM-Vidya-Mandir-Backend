require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin : "https://www.dbmvidyamandir.com/",
         methods: [ "POST"],
         allowedHeaders: ["Content-Type", "Authorization"],
        credentials:true
    }
));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

// API Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
