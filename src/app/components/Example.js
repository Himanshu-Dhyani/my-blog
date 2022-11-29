import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import AddTodoModal from './AddTodoModal';
import EditTodoModal from './EditTodoModal';
import { useParams } from 'react-router-dom'


export default function Example() {

    const params = useParams()

    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showEditId, setShowEditId] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const getTodo = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((res) => res.json())
            .then((json) => setTodos(json))
    }
    useEffect(() => {
        getTodo()
    }, [])

    const delTodo = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status !== 200) {
                return console.log("Err in DelTodo")
            }
            else {
                setTodos(todos.filter((todos) => {
                    return todos.id !== id
                }))
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTodoTitle = (e) => setTitle(e.target.value)

    const handleAddTodo = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            body: JSON.stringify({
                id: 201,
                title: title,
                userId: 1,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            if (res.status !== 201) {
                return console.log("Err in AddTodo")
            }
            else {
                return res.json()
            }
        }).then((json) => {
            setTodos((todos) => [json, ...todos])
            handleClose()
        })
    }

    const handleTodoEditTitle = (e) => setEditTitle(e.target.value)

    const editTodoBtn = (id) => {
        handleShowEdit()
        setShowEditId(id)
    }

    const editTodos = async () => {
        const data = {
            id: `${showEditId}`,
            title: `${editTitle}`,
            completed: false,
            userId: `${params.id}`,
        }

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
        <div>
            <Button onClick={handleShow}>add</Button>
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
                        <Button onClick={() => delTodo(todo.id)}>Del</Button>
                        <Button onClick={() => editTodoBtn(todo.id)}>Edit</Button>
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

        </div>
    )
}

