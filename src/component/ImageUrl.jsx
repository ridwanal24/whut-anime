import React, { useState } from 'react'
import { GlobalOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Button, Switch, Typography, Input } from 'antd'

function ImageUrl({ loading, setLoading, setResult }) {
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

    const handleChange = (e) => {
        setImgUrl(e.target.value)
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (!imgUrl) {
            message.error('Please choose image')
            return
        }


        try {
            const res = await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imgUrl)}${blackBorder ? '&cutBorder' : ''}`)

            const data = await res.json()
            setResult(data.result)
            // console.log(data)
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={imageStyle}
            >
                {
                    !imgUrl ? (
                        <React.Fragment>
                            <Text style={{ display: 'block', fontSize: '0.5rem' }} type="secondary" italic>Your image</Text>
                        </React.Fragment>
                    ) : (
                        loading ? loadingUploadComp : ''
                    )
                }
            </div>
            <br />
            <Input prefix={<GlobalOutlined />} onChange={handleChange} value={imgUrl} placeholder="Type image url" size="large" ></Input>
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

export default ImageUrl
