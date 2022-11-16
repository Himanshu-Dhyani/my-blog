import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import TabContents from '../components/TabContents';
import Header from '../components/Header';

export default function UserDetail() {
    const params = useParams();

    const [userDetail, setUserDetail] = useState(null)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            .then((res) => res.json())
            .then((json) => setUserDetail(json))
    }, [params.id])

    return (
        <div>
            <Header />
            {userDetail &&
                <Card className='userCarduserDetail'>
                    <Card.Body>
                        <Card.Text><b>Name :</b> {userDetail.name}</Card.Text>
                        <Card.Text><b>Username :</b> {userDetail.username}</Card.Text>
                        <Card.Text><b>Email :</b> {userDetail.email}</Card.Text>
                        <Card.Text><b>Address :</b> {userDetail.address.suite}, {userDetail.address.street}, {userDetail.address.city}, {userDetail.address.zipcode}</Card.Text>
                        <Card.Text><b>Phone :</b> {userDetail.phone}</Card.Text>
                        <Card.Text><b>Website :</b> {userDetail.website}</Card.Text>
                        <Card.Text><b>Company :</b> {userDetail.company.name}</Card.Text>
                    </Card.Body>
                    <TabContents />
                </Card>
            }
        </div>
    )
}
