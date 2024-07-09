'use client'
import React, { useState } from 'react'
import { Button, Card, Input, List, ListItem } from '@material-tailwind/react';

const SpecificUsers = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState();




    const fetchUserData = async () => {
        const response = await fetch(`api/users/${userId}`);
        if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
        }
        else {
            alert("Error Fetching Data");
        }
    }

    return (
        <div>

            <div className='flex gap-4'>
                <div className="w-72">
                    <Input label="Enter User Id" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />

                </div>
                <Button onClick={fetchUserData}>Fetch Data </Button>


            </div >
            {userData ?
                userData.map((data) => {
                    return (
                        <Card className='w-96 mt-5' key={data.id}>
                            <List>
                                <ListItem>Id : {data.id}</ListItem>
                                <ListItem>Name : {data.name}</ListItem>
                                <ListItem>Age : {data.age}</ListItem>
                                <ListItem>Email: {data.email}</ListItem>
                            </List>

                        </Card>

                    )
                })
                : (<p>Search for a Specific User</p>)
            }

        </div>
    )
}

export default SpecificUsers
