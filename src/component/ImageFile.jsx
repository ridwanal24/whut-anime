import React, { useState } from 'react'
import { Button, Typography, message, Switch, Input, Select } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import FormData from 'form-data'
import Paragraph from 'antd/lib/typography/Paragraph'

function ImageFile({ loading, setLoading, setResult, anilist, setAnilist, anilistId, setAnilistId, fetchAnilist }) {
    const { Option } = Select
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
        if (anilistId) {
            formData.append('anilistID', anilistId)
        }
        console.log(anilistId)
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
                            <Text style={{ display: 'block', marginTop: '-20vw', fontSize: '0.5rem' }} type="secondary" italic>Choose image</Text>
                        </React.Fragment>
                    ) : (
                        loading ? loadingUploadComp : ''
                    )
                }
            </div>
            <input disabled={loading} type="file" onChange={handleChange} style={{ display: 'none' }} name="choose_image" />
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
            <br />
            <Button disabled={loading} loading={loading} onClick={handleSubmit} type="primary">Search</Button>
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
