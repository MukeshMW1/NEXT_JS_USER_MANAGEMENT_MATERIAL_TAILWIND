import { users } from '@/app/util/db.js';
import { NextResponse } from 'next/server';
import fs from 'fs'

export async function GET(_, res) {
    const { id } = await res.params;
    // const { id } = params;
    const user = users.filter((u) => u.id === id)
    return NextResponse.json({ user }, { status: 200 });
}


//Post request for login

export async function POST(req, res) {
    let { name, email, password } = await req.json();
    const { id } = await res.params
    let { name: uName, email: uEmail, password: uPassword } = users.find((u) => u.id === id)

    if (uName === name && uEmail === email && password === uPassword) {
        return NextResponse.json({ "result": "Succesfully logged in " })
    }
    else if (!name || !email || !password) {
        return NextResponse.json({ "result": "input all fields" })
    }
    else {
        return NextResponse.json({ "result": "Error logging in" })
    }
}


//Delete User
export async function DELETE(req, res) {
    let { id } = await res.params;
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return NextResponse.json({ result: "User not found" }, { status: 404 })
    };

    //Remove users from array
    users.splice(userIndex, 1);

    //Extract just the user array from the updated data
    let updatedData = users;
    //Converting the updated array to json string
    updatedData = JSON.stringify(updatedData, null, 2);

    //write  the updated \users array to a JSON string
    fs.writeFileSync('./app/util/db.js', `export const users=${updatedData}`, "utf-8");

    return NextResponse.json({ success: "User deleted" })




}


