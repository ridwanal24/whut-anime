import { Menu, Typography, Card } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import React from 'react'

function Main() {
    const { Text, Link } = Typography
    const tabList = [
        {
            key: 'image',
            tab: 'Image'
        },
        {
            key: 'url',
            tab: 'Url Image'
        }
    ]

    console.log(process.env.PUBLIC_URL + '/whut-logo.png')
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
                <Content style={{ padding: '50px 100px' }}>
                    <Card tabList={tabList}>

                    </Card>
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
