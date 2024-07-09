import { users } from '@/app/util/db.js';
import { NextResponse } from 'next/server';
import fs from 'fs';


export function GET() {
    const data = users;
    return NextResponse.json({ data }, { status: 200 });
}


//Create User
export async function POST(req, res) {

    let { id, name, email, password, age } = await req.json();


    const isDuplicate = users.some((u) => u.id === id || u.email === email)

    //check if the data is provided
    if (!id || !name || !email || !password) {
        return NextResponse.json({ "result": "Please fill all the fields " }, { status: 400 });
    }
    else if (isDuplicate) {
        return NextResponse.json({ "result": "Email or id already taken" })
    }
    else {
        //Add new user to in-memory array
        users.push({ id, email, age, password, name })
    }
    //Extract just the user array from the updated data
    let updatedData = users;
    //Converting the updated array to json string
    updatedData = JSON.stringify(updatedData, null, 2);

    //write  the updated \users array to a JSON string
    fs.writeFileSync('./app/util/db.js', `export const users=${updatedData}`, "utf-8");

    return NextResponse.json({ success: "User created succesfully" })



}


//Update users

export async function PUT(req, res) {

    let { id, name, age, email, password } = await req.json();

    //find the user in the users array
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return NextResponse.json({ "resut": "User not found" }, { status: 400 })
    }

    if (name) {
        users[userIndex].name = name;
    }
    if (email) {
        users[userIndex].email = email;
    }
    if (age) {
        users[userIndex].age = age;
    }
    if (password) {
        users[userIndex].password = password;
    }

    //Extract just the user array from the updated data
    let updatedData = users;
    //Converting the updated array to json string
    updatedData = JSON.stringify(updatedData, null, 2);

    //write  the updated users array to a JSON string
    fs.writeFileSync('./app/util/db.js', `export const users=${updatedData}`, "utf-8");

    return NextResponse.json({ success: "User  updated" })





}