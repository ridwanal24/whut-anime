import React from 'react'
import { Card, Typography } from 'antd'

function ResultItem({ anilist, episode, filename, from, image, similarity, to, video }) {
    const { Text, Title } = Typography
    const { id, idMal, isAdult, synonyms, title } = anilist
    const { english, native, romaji } = title
    console.log(episode)
    return (
        <Card style={{ margin: '10px 0' }}>
            <Card.Grid style={{ width: '40%', padding: 0 }} hoverable={false} >
                <img style={{ width: '100%' }} src={image} alt="thumbnail" />
            </Card.Grid>
            <Card.Grid style={{ width: '60%', paddingLeft: '10px' }} hoverable={false}>
                <Title style={{ marginBottom: 0 }} level={5}>{romaji}</Title>
                <Text type="success" strong>Episode {episode}</Text>
            </Card.Grid>
        </Card>
    )
}

export default ResultItem
