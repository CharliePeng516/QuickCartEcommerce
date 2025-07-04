import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to MongoDB

export const syncUserCreation = inngest.createFunction(
    {
    id: "sync-user-creation",
    },
    { event: 'clerk/user.created'},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };

        await connectDB();
        await User.create(userData);
    }
)

// Inngest Function to update user data in Database

export const syncUserUpdation = inngest.createFunction(
    {
        id: "sync-user-updation",
    },
    { event: 'clerk/user.updated'},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };

        await connectDB();
        await User.findByIdAndUpdate(id, userData, { new: true });
    }
)

// Inngest Function to delete user data from Database
export const syncUserDeletion = inngest.createFunction(
    {
        id: "sync-user-deletion",
    },
    { event: 'clerk/user.deleted'},
    async ({ event }) => {
        const { id } = event.data;

        await connectDB();
        await User.findByIdAndDelete(id);
    }
)