import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'

const { TextArea } = Input;

// {Continents.map()}
// 이라는 메소드로 한개씩 불러올수가 있다
const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]



function UploadProductPage() {
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)

    const [Images, setImages] = useState([])


    const titleChnageHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const DescriptiononChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const onContinentsSelectChange = (evnet) => {
        setContinentValue(evnet.currentTarget.value)

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 >여행 상품 업로드</h2>
            </div>
            <Form>
                {/* 업로드 하는 창은 다른곳에서도 사용할수 있기 때문에 component를 만들어 이용  */}
                {/* DropZone */}
                {/* FileUpload.js는 UploadProductPage.js의 자식 component이므로 */}
                {/* 부모 component에서 자식 copmonent의 이미지 정보를 가지고 있어야 한다 */}
                {/* FileUpload에서 확인 버튼을 누르면 모든 정보를 UploadProductPage coponent에서 한번에 backend로 보내줘야 하기 때문에  */}
                {/* 부모 component로 올려줘야 한다  */}
                <FileUpload />
                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChnageHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={DescriptiononChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />
                <Button>
                    확인
                </Button>


            </Form>
        </div >
    )
}

export default UploadProductPage
