import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Loader from './Loader';
// import { Link } from 'react-router-dom';

export default function Search({ activeList }) {

    // states
    // const [searchArray, setSearchArray] = useState([])
    const [searchInput, setSearchInput] = useState("");


    // fetch api
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts`)
    //         .then((res) => res.json())
    //         .then((json) => setSearchArray(json))
    // }, [])




    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        activeList.filter((post) => {
            return post.title.match(searchInput);
        });
    }

    console.log(">>>", searchInput)

    // console.log(activeList)

    return (
        <div>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleChange}
                />
                <Button variant="outline-success" onClick={handleChange} >Search</Button>
            </Form>


            {/* {searchArray.length === 0 ? <Loader /> : (
                <div>
                    <div className="card_container">
                        {searchArray.map((post) => (
                            <Card className="card" key={post.id}>
                                <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" />
                                <Card.Body >
                                    <Card.Title className="card_title">{post.title}</Card.Title>
                                    <Card.Text className="card_desc">{post.body}</Card.Text>

                                    <Link to={`/my-blog/blogDetail/${post.id}`} >
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

            )} */}
        </div>
    )
}
