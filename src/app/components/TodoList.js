import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function TodoList() {

    const params = useParams()

    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${params.id}`)
            .then((res) => res.json())
            .then((json) => setTodos(json))
    }, [params.id])

    return (
        <>
            {todos.map((todo) => (
                <Card className='albumCard' key={todo.id}>
                    <Card.Body>
                        <Card.Title><Form.Check
                            key={todo.id}
                            type="checkbox"
                            id={`default-checkbox`}
                            defaultChecked={todo.completed}
                            label={todo.title}
                        /></Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}
