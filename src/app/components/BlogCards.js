import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import AddPostModal from './AddPostModal';
import Search from './Search';

function BlogCards() {

    const params = useParams();
    const [activeList, setActiveList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [errorMsgForTitle, setErrorMsgForTitle] = useState("")
    const [errorMsgForDesc, setErrorMsgForDesc] = useState("")
    const [searchInput, setSearchInput] = useState("");
    const [activePage, setActivePage] = useState(1)
    const [postsPerPage] = useState(6);

    const handleClose = () => {
        setShow(false)
        setErrorMsgForTitle("")
        setErrorMsgForDesc("")
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`)
            .then((res) => res.json())
            .then((json) => setActiveList(json))
    }, [params.id])

    const newPost = {
        "userId": `${params.id}`,
        "id": 101,
        "title": `${title}`,
        "body": `${desc}`
    }

    const delPost = (id) => {
        setActiveList(
            activeList.filter((activeList) => {
                return activeList.id !== id;
            }),
        );
    };

    const handlePostTitle = (e) => {
        setTitle(e.target.value)
        setErrorMsgForTitle("")
    }

    useEffect(() => {
        if (/^\s/.test(title)) {
            setTitle("");
        }
    }, [title]);

    const handlePostDesc = (e) => {
        setDesc(e.target.value)
        setErrorMsgForDesc("")
    }

    // useEffect(() => {
    //     if (/^\s/.test(desc)) {
    //         setDesc("");
    //     }
    // }, [desc]);

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
            setActiveList([newPost, ...activeList])
            handleClose()
            setTitle("")
            setDesc("")
            // && !/^\s/.test(title && desc)
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        if (/^\s/.test(searchInput)) {
            setSearchInput("");
        }
    }, [searchInput]);

    const filtered = activeList.filter(post => {
        const searchValue = searchInput.toLowerCase();
        const title = post.title.toLowerCase();
        return title.startsWith(searchValue) || title === searchValue || title.includes(searchValue);
    });

    const handleSearchClick = () => {
        if (searchInput !== "" && !/^\s/.test(searchInput)) {
            setActiveList(filtered)
        }
        setActivePage(1)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSearchClick()
        }
    };

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
                        <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" />
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