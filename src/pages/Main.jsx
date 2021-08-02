import { Menu, Typography, Card, Tabs, Row, Col } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import React, { useState, useEffect } from 'react'
import ImageFile from '../component/ImageFile'
import ImageUrl from '../component/ImageUrl'
import ResultItem from '../component/ResultItem'

function Main() {
    const { Text, Link, Title } = Typography
    const [anilist, setAnilist] = useState([])
    const [anilistId, setAnilistId] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])

    const fetchAnilist = async (search) => {
        setLoading(true)
        const query = `{
                            Page(page:1, perPage:100){
                                media(type:ANIME,search: "${search}", sort:ID) {
                                    id
                                    title {
                                        romaji
                                        english
                                        native
                                    }
                                }
                            }
                        }`
        const opt = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        }
        try {
            const res = await fetch('https://graphql.anilist.co', opt)
            const data = await res.json()

            setAnilist(data.data.Page.media)
            console.log(data.data.Page.media)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <Layout>
                <Header>
                    <div className="logo" style={{ height: '32px', float: 'left', lineHeight: '32px', margin: '16px 0 16px 0', overflow: 'hidden' }}>
                        <img style={{ height: '100%', objectFit: 'cover', objectPosition: 'center center' }} src={process.env.PUBLIC_URL + '/whut-logo.png'} alt="" />
                    </div>
                    <Menu mode="horizontal" defaultSelectedKeys={['home']} theme="dark" >
                        <Menu.Item style={{ marginLeft: 'auto' }} key="home">Home</Menu.Item>
                        <Menu.Item key="about">About</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '50px 0' }}>
                    <Row justify="center">
                        <Col lg={16} md={18} sm={20} xs={22} >
                            <Card style={{ minHeight: '75vh' }}>
                                <Tabs defaultActiveKey="upload" centered>
                                    <Tabs.TabPane disabled={loading} tab="Upload Image" key="upload">
                                        <ImageFile anilistId={anilistId} setAnilistId={setAnilistId} anilist={anilist} setAnilist={setAnilist} fetchAnilist={fetchAnilist} loading={loading} setResult={setResult} setLoading={setLoading} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane disabled={loading} tab="From URL" key="url">
                                        <ImageUrl anilistId={anilistId} setAnilistId={setAnilistId} anilist={anilist} setAnilist={setAnilist} fetchAnilist={fetchAnilist} loading={loading} setResult={setResult} setLoading={setLoading} />
                                    </Tabs.TabPane>
                                </Tabs>
                            </Card>
                            <Title style={{ margin: '10px', textAlign: 'center' }} level={2}>Your Result</Title>
                            <div>
                                {
                                    result.map((item, index) => {
                                        return (
                                            <ResultItem key={index} {...item} />
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ background: '#001529', textAlign: 'center' }}>
                    <Text italic style={{ color: 'white' }} >Dibuat oleh <Link href="http://github.com/ridwanal24">Orang Ini</Link> </Text>
                    <br />
                    <Text italic style={{ color: 'white' }}>Menggunakan ReactJS dengan API dari <Link href="https://soruly.github.io/trace.moe-api">trace.moe</Link> </Text>
                </Footer>
            </Layout>
        </div >
    )
}

export default Main
