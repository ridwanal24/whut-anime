import React from 'react'
import { Card, Typography, Button, Tooltip, Popover } from 'antd'
import { InfoCircleTwoTone } from '@ant-design/icons'

function ResultItem({ anilist, episode, filename, from, image, similarity, to, video }) {
    const { Paragraph, Title, Link } = Typography
    const { id, idMal, isAdult, synonyms, title } = anilist
    const { english, native, romaji } = title
    const popOverContent = (
        <div>
            <Paragraph>{english}</Paragraph>
            <Paragraph>{native}</Paragraph>
            <Paragraph>{romaji}</Paragraph>
            {
                synonyms.map((item, index) => <Paragraph key={index}>{item}</Paragraph>)
            }
        </div>
    )


    const toTime = (second) => {
        second = parseInt(second)
        let minute = parseInt(second / 60)
        second -= minute * 60
        let hour = parseInt(minute / 60)
        minute -= hour * 60

        const validate = (angka) => {
            angka = `${angka}`
            angka = angka.length === 1 ? `0${angka}` : angka
            return angka
        }


        return `${validate(hour)}:${validate(minute)}:${validate(second)}`
    }

    return (
        <Card style={{ margin: '10px 0' }}>
            <Card.Grid style={{ width: '40%', padding: 0, objectFit: 'cover' }} hoverable={false} >
                <img style={{ width: '100%' }} src={image} alt="thumbnail" />
            </Card.Grid>
            <Card.Grid style={{ width: '60%', paddingLeft: '20px', boxShadow: 'none' }} hoverable={false}>
                <Title style={{ marginBottom: 0 }} level={5}>
                    {romaji}
                    <Popover content={popOverContent} trigger="click" title="Alternative Title">
                        <Tooltip zIndex="1" title="Alternative Title" >
                            <InfoCircleTwoTone />
                        </Tooltip>
                    </Popover>
                </Title>
                <Paragraph style={{ margin: 0 }} type="success" >Episode {episode}</Paragraph>
                <Paragraph italic type="secondary">{toTime(from)} - {toTime(to)}</Paragraph>
                <Paragraph italic type="danger">{parseInt(similarity * 10000) / 100}% Similarity</Paragraph>
                <div>
                    <Link href={video} target="_blank">
                        <Button type="primary">Video</Button>
                    </Link>
                    <Link href={'https://myanimelist.net/anime/' + idMal} target="_blank">
                        <Button type="success">MyAnimeList</Button>
                    </Link>
                </div>
            </Card.Grid>
        </Card>
    )
}

export default ResultItem
