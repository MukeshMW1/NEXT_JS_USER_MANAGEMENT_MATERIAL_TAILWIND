'use client'
import React, { useState } from 'react';
import { Button, Card, Input, List, ListItem } from '@material-tailwind/react'



const UpdateUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            let res = await fetch('api/users', {
                method: "PUT", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    name,
                    age,
                    email,
                    password
                })
            })
            if (res.ok) {
                res = await res.json()
                alert(res.success);
            }
            else {
                throw new Error("Error while Updating a user")
            }
        }
        catch (e) {
            console.log("There was an error updating the user", e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='m-[10px]'>
                <h1 className='text-[40px] text-center font-bold'>Update Form</h1>

                <div className='m-[20px] flex flex-col gap-[10px]'>
                    <Input type="text" label="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

                    <Input type="number" label="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />

                    <Input type="email" label="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Input type="password" label="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Input type="text" label="Enter your id" value={id} onChange={(e) => setId(e.target.value)} />

                </div>
                <Button color="blue" type='submit'>Update</Button>
            </div>
        </form>
    )
}

export default UpdateUser
