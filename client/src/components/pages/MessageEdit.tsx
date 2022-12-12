import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

function MessageEdit() {
    const [cookie] = useCookies(["user"]);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState({ senderId: cookie.user, receiverId: userId, content: "" });

    // Validation
    const [validated, setValidated] = useState(false);

    const handleChange = (e: {
        target: {
            id: string; value: string;
        };
    }) => {
        const { id, value } = e.target
        setValue(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false)
            e.stopPropagation();

        setValidated(true);
        createMessage();
        navigate(-1);
    };

    async function createMessage() {
        await axios.post(`/api/message/${userId}/messages`, {
            senderId: value.senderId,
            receiverId: value.receiverId,
            content: value.content
        })
            .then(function (response) {
                console.log(response.data);
            })
    }

    return (
        <div>
            <div className="tile-03">
                <h1 className="fluid-heading-04 mb-07">새 쪽지</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h2 className="fluid-heading-03 mb-07">필수 정보</h2>
                    <Form.Group className="mb-07" controlId="receiverId">
                        <Form.Label>받는 사람 ID</Form.Label>
                        <Form.Control required type="text" maxLength={50} value={value.receiverId || ""} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-07" controlId="content">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" type="text" maxLength={5000} value={value.content || ""} onChange={handleChange} />
                    </Form.Group>



                    <Form.Group>
                        <Button className="me-2" variant="secondary" onClick={() => navigate(-1)}>취소</Button>
                        <Button type="submit">완료</Button>
                    </Form.Group>

                </Form>
            </div>
        </div >
    )
}

export default MessageEdit
