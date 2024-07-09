'use client'
import React, { useState } from 'react';
import { Button, Card, Input, List, ListItem } from '@material-tailwind/react'
// import { POST } from '@/app/api/users/route';



const DeleteUser = () => {

    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            alert("Please provie an ID to delete")
        }
        try {

            let res = await fetch(`api/users/${id}`, {
                method: "DELETE"

            })
            if (res.ok) {
                res = await res.json()
                alert(res.success);
            }
            else {
                throw new Error("Error while Deleting a user")
            }
        }
        catch (e) {
            console.log("There was an error deleting a user", e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='m-[10px]'>
                <h1 className='text-[40px] text-center font-bold'>Del Form</h1>

                <div className='m-[20px] flex flex-col gap-[10px]'>
                    <Input type="text" label="Enter  id to delete" value={id} onChange={(e) => setId(e.target.value)} />

                </div>
                <Button color="blue" type='submit'>Del</Button>
            </div>
        </form>
    )
}

export default DeleteUser
