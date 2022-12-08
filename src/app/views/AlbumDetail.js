import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function AlbumDetail() {

    // useParams helps us to take the Id from the url
    const params = useParams();

    const [albumDetail, setAlbumDetail] = useState([])

    useEffect(() => {
        // fetches album detail of a particular user which we want
        fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}/photos`)
            .then((res) => res.json())
            // set state when the data received
            .then((json) => setAlbumDetail(json))
    }, [params.id])
    return (
        <div className='card_container'>
            {albumDetail.length === 0 ? <Loader /> : (
                <>
                    {albumDetail.map((albDetail) => (
                        <Card className='blogCard' key={albDetail.id}>
                            <Card.Img variant="top" src={albDetail.thumbnailUrl} />
                            <Card.Body >
                                <Card.Title>{albDetail.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                    }
                </>
            )
            }
        </div>
    )
}
