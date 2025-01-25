import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    displayName: mongoose.Schema.Types.String,
    password: {
    type: mongoose.Schema.Types.String,
    required: true,
    },
});

export const User = mongoose.model('User', UserSchema);


//client_secret: cMtVtf0TcdAYpsebSmNNgoiuSOqBIJoQ
//client ID: 1332721352972697641
//redirect_url: http://localhost:3000/api/auth/discord/redirect