const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
const uri = "mongodb+srv://EWISWE:$WEplanner@companies-ewi.abqvr.mongodb.net/?retryWrites=true&w=majority&appName=companies-ewi";

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Hash the password
        const hashedPassword = await bcrypt.hash('$WEplanner', 10);

        // Create admin user
        const admin = new Admin({
            username: 'EWISWE',
            password: hashedPassword
        });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();