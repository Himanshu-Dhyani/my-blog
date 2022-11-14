// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Pagination from 'react-js-pagination';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// import Loader from './Loader';

// function BlogCards({ activePage, activeList, handlePageChange }) {

//     return (
//         <>
//             <Header />
//             {activeList.length === 0 ? <Loader /> : (
//                 <div>
//                     <div className="card_container">
//                         {activeList.map((post) => (
//                             <Card className="card" key={post.id}>
//                                 <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" />
//                                 <Card.Body >
//                                     <Card.Title className="card_title">{post.title}</Card.Title>
//                                     <Card.Text className="card_desc">{post.body}</Card.Text>

//                                     <Link to={`blogDetail/${post.id}`} >
//                                         <Button variant="primary">
//                                             Detail
//                                         </Button>
//                                     </Link>

//                                 </Card.Body>
//                             </Card>
//                         ))
//                         }
//                     </div>
//                     <Pagination
//                         innerClass="paginationMain"
//                         activeClass="activePageClass"
//                         activePage={activePage}
//                         itemsCountPerPage={activeList.length}
//                         totalItemsCount={100}
//                         pageRangeDisplayed={5}
//                         onChange={handlePageChange}
//                     />
//                 </div>

//             )}
//         </>
//     );
// }

// export default BlogCards;