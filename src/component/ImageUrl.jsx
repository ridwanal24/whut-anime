import React, { useState } from 'react'
import { GlobalOutlined, LoadingOutlined } from '@ant-design/icons'
import { message, Button, Switch, Typography, Input, Select } from 'antd'

function ImageUrl({ loading, setLoading, setResult, fetchAnilist, anilist, setAnilistId, anilistId }) {
    const { Text, Paragraph } = Typography
    const { Option } = Select
    const [imgUrl, setImgUrl] = useState('')
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
        if (!imgUrl) {
            message.error('Please fill image url')
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imgUrl)}${blackBorder ? '&cutBorder' : ''}${anilistId ? '&anilistID=' + anilistId : ''}`)

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
            <Input disabled={loading} prefix={<GlobalOutlined />} onChange={handleChange} value={imgUrl} placeholder="Type image url" size="large" ></Input>
            <Input onChange={e => fetchAnilist(e.target.value)} style={{ width: '20vw' }} placeholder="Type here for search anime name" />
            <Select disabled={loading} loading={loading} onSelect={e => setAnilistId(e)} style={{ marginTop: '20px', marginBottom: '10px', width: '20vw' }} >
                {
                    !anilist ? (
                        <Option disabled>Type for search</Option>
                    ) : (
                        anilist.map(item => <Option value={item.id} >{item.title.romaji}</Option>)
                    )
                }
            </Select>
            <Paragraph type="secondary" >Type anime name then select from right box (if you know anime name)</Paragraph>
            <Button disabled={loading} loading={loading} style={{ marginTop: '20px' }} onClick={handleSubmit} type="primary">Search</Button>
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
