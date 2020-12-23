import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
// file을 drag drop해서 올리는 component
// Drop-Zone 라이브러리로 사용한다 
// react dropzone 검색하면 사용 법 나옴
import axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])


    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        // file을 전송할때는 formData, config 를 같이 전송해야한다 
        // formData 안에 파일에 대한 정보가 들어가고 
        // header에 이게  어떤파일인지에 대한 type을 정해줘야함
        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                } else {
                    alert('Failed to save the Image in Server')
                }
            })

    }

    const deleteHandler = (image) => {
        // 이미지를 삭제하려면 
        // 각 이미지에 index 값을 부여하여
        // 삭제하도록 처리
        const currentIndex = Images.indexOf(image)
        //console.log('currneIndex', currentIndex)

        let newImages = [...Images]
        // newImages라는 array 에서 currentIndex(인덱스 번호) 로 시작해서 1개를 삭제
        newImages.splice(currentIndex, 1)

        setImages(newImages);


    }

    return (
        // dropzon npm 검색하면 사용법 나옴 
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300, height: 240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>
            {/* {올린 이미지를 표출해 주는 부분 } */}
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FileUpload
