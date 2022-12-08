import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import AddPostModal from './AddPostModal';
import Search from './Search';

function BlogCards() {

    // useParams helps us to take the Id from the url
    const params = useParams();

    //States
    const [activeList, setActiveList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [errorMsgForTitle, setErrorMsgForTitle] = useState("")
    const [errorMsgForDesc, setErrorMsgForDesc] = useState("")
    const [searchInput, setSearchInput] = useState("");
    const [activePage, setActivePage] = useState(1)
    const [postsPerPage] = useState(6);

    //To close modal and reset error msg
    const handleClose = () => {
        setShow(false)
        setErrorMsgForTitle("")
        setErrorMsgForDesc("")
    };

    //To open Add Post modal
    const handleShow = () => setShow(true);

    useEffect(() => {
        // fetches posts of a particular user which we want
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`)
            .then((res) => res.json())
            // set state when the data received
            .then((json) => setActiveList(json))
    }, [params.id])

    //new object to add in activeList
    const newPost = {
        "userId": `${params.id}`,
        "id": 101,
        "title": `${title}`,
        "body": `${desc}`
    }

    // Delete Post
    const delPost = (id) => {
        // set state when del button is clicked
        setActiveList(
            // Del an object from the previously set list
            activeList.filter((activeList) => {
                return activeList.id !== id;
            }),
        );
    };

    //while adding post to know the value of title
    const handlePostTitle = (e) => {
        //set state when the title is changed 
        setTitle(e.target.value)
        //set state of err msg to empty when we make changes in input
        setErrorMsgForTitle("")
    }

    //while adding post to know the value of desc
    const handlePostDesc = (e) => {
        //set state when the desc is changed 
        setDesc(e.target.value);
        //set state of err msg to empty when we make changes in input
        setErrorMsgForDesc("");
    }

    //validation when you are adding a post 
    const handleAddPost = () => {
        if (title.length === 0 && desc.length === 0) {
            setErrorMsgForTitle("Enter Title")
            setErrorMsgForDesc("Enter Description")
        }
        else if (title.length === 0) {
            setErrorMsgForTitle("Enter Title")
        }
        else if (desc.length === 0) {
            setErrorMsgForDesc("Enter Description")
        }
        else if (title && desc !== "") {
            setActiveList([newPost, ...activeList]);
            handleClose();
            setTitle("");
            setDesc("");
        }
    }

    //to know the value of input in searchbar
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    //it is for not giving space at first of input at search bar
    useEffect(() => {
        if (/^\s/.test(searchInput)) {
            setSearchInput("");
        }
    }, [searchInput]);

    //converting searched input and title to lower case and filter them as such that it include the title
    const filtered = activeList.filter(post => {
        const searchValue = searchInput.toLowerCase();
        const title = post.title.toLowerCase();
        return title.startsWith(searchValue) || title === searchValue || title.includes(searchValue);
    });

    //on clicking search btn the searched input will show value
    const handleSearchClick = () => {
        if (searchInput !== "" && !/^\s/.test(searchInput)) {
            setActiveList(filtered)
        }
        setActivePage(1)
    }

    //on clicking enter key the searched input will show value
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSearchClick()
        }
    };

    //Pagination
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    const indexOfLastPost = activePage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = activeList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className='postCardHeader'>
                <Search
                    handleChange={handleChange}
                    searchInput={searchInput}
                    handleSearchClick={handleSearchClick}
                    handleKeyDown={handleKeyDown}
                />
                <Button onClick={handleShow} className="addPostBtn">+ Add Post</Button>
            </div>
            <div className="card_container">
                {currentPosts.map((post) => (
                    <Card className="blogCard" key={post.id} >
                        {/* <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" /> */}
                        <Card.Body >
                            <Card.Title className="card_title">{post.title}</Card.Title>
                            <Card.Text className="card_desc">{post.body}</Card.Text>

                            <Link to={`/blogDetail/${post.id}`} >
                                <Button variant="primary">
                                    Detail
                                </Button>
                            </Link>{" "}
                            <Button variant="danger" onClick={() => delPost(post.id)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))
                }
            </div>
            <Pagination
                innerClass={`${activeList.length <= 3 ? 'paginationMainHide' : 'paginationMain'}`}
                activeClass='activePageClass'
                activePage={activePage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={activeList.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />

            <AddPostModal
                handleClose={handleClose}
                show={show}
                handleAddPost={handleAddPost}
                handlePostTitle={handlePostTitle}
                handlePostDesc={handlePostDesc}
                errorMsgForTitle={errorMsgForTitle}
                errorMsgForDesc={errorMsgForDesc}
            />
        </>
    );
}

export default BlogCards;