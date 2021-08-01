import React, { useState } from 'react'
import { Button, Typography, message, Switch } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import FormData from 'form-data'

function ImageFile({ loading, setLoading, setResult }) {
    const { Text } = Typography
    const [imgUrl, setImgUrl] = useState('')
    const [imgObj, setImgObj] = useState('')
    const [imgSize, setImgSize] = useState('')
    const [blackBorder, setBlackBorder] = useState(false)
    const imageStyle = {
        borderRadius: '10px',
        width: '25vw',
        height: '25vw',
        lineHeight: '25vw',
        margin: '0 auto',
        border: imgUrl ? '' : '1px dashed #C5C5C5',
        backgroundImage: `url("${imgUrl}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }
    const loadingUploadComp = (
        <React.Fragment>
            <LoadingOutlined style={{ fontSize: '1.5rem', color: '#C5C5C5' }} />
            <Text style={{ display: 'block', marginTop: '-20vw' }} type="secondary" italic>Loading</Text>
        </React.Fragment>
    )

    const handleChange = (item) => {
        setImgSize(item.target.files[0].size)
        setImgObj(item.target.files[0])
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImgUrl(reader.result)
        })

        reader.readAsDataURL(item.target.files[0])
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (!imgUrl) {
            message.error('Please choose image')
            return
        }
        if (imgSize > 9000000) {
            message.error('Image must be lower than 9 MB')
            return
        }

        const formData = new FormData()
        formData.append('image', imgObj)
        formData.append('cutBorder', blackBorder)
        try {
            const res = await fetch('https://api.trace.moe/search?anilistInfo', {
                method: 'post',
                body: formData
            })

            const data = await res.json()
            setResult(data.result)

        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                onClick={_ => document.querySelector('[name=choose_image]').click()}
                style={imageStyle}
            >
                {
                    !imgUrl ? (
                        <React.Fragment>
                            <PlusOutlined style={{ fontSize: '1.5rem', color: '#C5C5C5' }} />

                            <Text style={{ display: 'block', marginTop: '-20vw' }} type="secondary" italic>Choose image to upload</Text>
                        </React.Fragment>
                    ) : (
                        loading ? loadingUploadComp : ''
                    )
                }
            </div>
            <input disabled={loading} type="file" onChange={handleChange} style={{ display: 'none' }} name="choose_image" />
            <Button disabled={loading} style={{ marginTop: '20px' }} onClick={handleSubmit} type="primary">Search</Button>
            <br />
            <br />
            <Switch disabled={loading} checked={blackBorder} onChange={_ => setBlackBorder(!blackBorder)} /> <Text type="secondary">Cut Black Border</Text>
            <br />
            <br />
            <Text type="secondary" style={{ fontSize: '0.85rem' }} italic>The recommended resolution is 640 x 360px, higher resolution doesn't yield better search results. Your image must be smaller than 9 MB.</Text>
        </div>
    )
}

export default ImageFile
