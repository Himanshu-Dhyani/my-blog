import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import AddTodoModal from './AddTodoModal';
import { Button } from 'react-bootstrap';
import EditTodoModal from './EditTodoModal';

export default function TodoList() {

    // useParams helps us to take the Id from the url
    const params = useParams()

    //States
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState("")
    const [showEditId, setShowEditId] = useState(0);
    const [editTitle, setEditTitle] = useState("")
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    //To close Add todo modal
    const handleClose = () => setShow(false);

    //To open Add todo modal
    const handleShow = () => setShow(true);

    //To close edit todo modal
    const handleCloseEdit = () => setShowEdit(false);

    //To open edit todo modal
    const handleShowEdit = () => setShowEdit(true);

    useEffect(() => {
        // fetches todos of a particular user which we want
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${params.id}`)
            .then((res) => res.json())
            // set state when the data received
            .then((json) => setTodos(json))
    }, [params.id])

    //to find value of title while adding todos
    const handleTodoTitle = (e) => setTitle(e.target.value)

    //new object to add in the array of todos
    const newtodo = {
        "userId": `${params.id}`,
        "id": 101,
        "title": `${title}`,
        "completed": false
    }

    //Adding todo in previous array and closing the modal 
    const handleAddTodo = () => {
        setTodos([newtodo, ...todos])
        handleClose()
    }

    //Passing id and calling Edit btn
    const editTodoBtn = (id) => {
        handleShowEdit()
        setShowEditId(id)
    }

    // value of title in input bar
    const handleTodoEditTitle = (e) => setEditTitle(e.target.value)

    //API call for editing to todos
    const editTodos = async () => {
        const data = {
            id: `${showEditId}`,
            title: `${editTitle}`,
            // completed: false,
            userId: `${params.id}`,
        }
        // fetches todos of todo which we want to edit
        await fetch(`https://jsonplaceholder.typicode.com/todos/${showEditId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            if (res.status !== 200) {
                return console.log("Err in Edit")
            }
            else {
                return res.json()
            }
        }).then((json) => {
            const editedTodo = todos.map(todo => {
                if (todo.id === json.id) {
                    return data;
                }
                return todo;
            });
            setTodos(editedTodo);
            console.log(editedTodo)
            handleCloseEdit()
        })
    }

    return (
        <>
            <div className='postCardHeader'><Button onClick={handleShow}>+ Add Todo</Button></div>
            {todos.map((todo) => (
                <Card className='albumCard' key={todo.id}>
                    <Card.Body>
                        <Card.Title className='todoTitle'>
                            <Form.Check
                                key={todo.id}
                                type="checkbox"
                                id={`default-checkbox`}
                                defaultChecked={todo.completed}
                            />
                            {todo.title}
                        </Card.Title>
                        <div className='postCardHeader'>
                            <Button className="btn-secondary" onClick={() => editTodoBtn(todo.id)}>Edit</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <AddTodoModal
                show={show}
                handleClose={handleClose}
                handleAddTodo={handleAddTodo}
                handleTodoTitle={handleTodoTitle}
            />

            <EditTodoModal
                show={showEdit}
                handleClose={handleCloseEdit}
                editTodos={editTodos}
                handleTodoEditTitle={handleTodoEditTitle}
            />

        </>
    )
}
