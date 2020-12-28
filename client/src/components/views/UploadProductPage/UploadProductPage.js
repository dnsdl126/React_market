import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';


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



function UploadProductPage(props) {
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

    const updateImages = (newImages) => {

        //  FileUpload에 있는 새로운 이미지 정보인 const [Images, setImages] = useState([])
        //  const [Images, setImages] 를 newImages 라는 이름의 파라메터로 받는다

        // 받아온 파라메터를 상단에  const [Images, setImages] = useState([]) 에 넣어준다        
        setImages(newImages)

        // refreshFunction (pros)을  FileUpload component에 전달 해준다 
        // FileUpload 로이동 
    }

    const submitHandler = (event) => {
        event.preventDefault();

        //유효성 검사
        if (!Title || !Description || !Price || !ContinentValue || !Images) {
            return alert("모든 값을 넣어주셔야 합니다.")
        }

        // 서버에 채운 값들ㅇ르 request로 보낸다.
        // post 여서 body 피룡
        const body = {
            //로그인 된 사람의 iD
            // hoc 파일의 auth.js
            //  <SpecificComponent {...props} user={user} />
            // user의 모든 정보를 담아뒀기 때문에
            // props를 이용해 유저정보를 가지고 온다 
            // uploadProductPage를 자식 component로 만든다 
            writer: props.user.userData._id,
            title: Title,
            discription: Description,
            price: Price,
            images: Images,
            Continents: ContinentValue
        }
        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 >여행 상품 업로드</h2>
            </div>
            <Form onSubmit={submitHandler}>
                {/* 업로드 하는 창은 다른곳에서도 사용할수 있기 때문에 component를 만들어 이용  */}
                {/* DropZone */}
                {/* FileUpload.js는 UploadProductPage.js의 자식 component이므로 */}
                {/* 부모 component에서 자식 copmonent의 이미지 정보를 가지고 있어야 한다 */}
                {/* FileUpload에서 확인 버튼을 누르면 모든 정보를 UploadProductPage coponent에서 한번에 backend로 보내줘야 하기 때문에  */}
                {/* 부모 component로 올려줘야 한다  */}
                {/* 1. refreshFunction={updateImages}  */}
                {/* 2.  const updateImages = (newImages) =>  */}
                <FileUpload refreshFunction={updateImages} />
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
                <button type="submit">
                    확인
                </button>


            </Form>
        </div >
    )
}

export default UploadProductPage
