import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
// import Search from './Search';



function BlogCards() {

    const params = useParams();
    const [activeList, setActiveList] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`)
            .then((res) => res.json())
            .then((json) => setActiveList(json))
    }, [params.id])

    return (
        <>
            {/* <Search activeList={activeList} /> */}
            {activeList.length === 0 ? <Loader /> : (
                <div>
                    <div className="card_container">
                        {activeList.map((post) => (
                            <Card className="blogCard" key={post.id}>
                                <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" />
                                <Card.Body >
                                    <Card.Title className="card_title">{post.title}</Card.Title>
                                    <Card.Text className="card_desc">{post.body}</Card.Text>

                                    <Link to={`/blogDetail/${post.id}`} >
                                        <Button variant="primary">
                                            Detail
                                        </Button>
                                    </Link>

                                </Card.Body>
                            </Card>
                        ))
                        }
                    </div>
                </div>

            )}
        </>
    );
}

export default BlogCards;