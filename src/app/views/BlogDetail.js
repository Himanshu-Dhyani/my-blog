import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
import Comment from '../components/Comment';
import Loader from '../components/Loader';

export default function BlogDetail() {

    // useParams helps us to take the Id from the url
    const params = useParams();

    const [activeList, setActiveList] = useState(null)

    // fetch api for post 
    useEffect(() => {
        // to fetch a post of particular user
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            .then((res) => res.json())
            // set state when the data received
            .then((json) => setActiveList(json))
    }, [params.id])

    return (
        <>
            <Header />

            {activeList === null ? <Loader /> :
                (<div className="blogDetailContainer">
                    {activeList && (
                        <>
                            <Card className='blog_detail'>
                                <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" />
                                <Card.Body>
                                    <Card.Title>{activeList.title}</Card.Title>
                                    <Card.Text>{activeList.body}</Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                    <Comment />
                </div>)}
        </>

    )
}
