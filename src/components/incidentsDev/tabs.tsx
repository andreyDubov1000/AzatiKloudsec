import React, { useState } from 'react'
import { Container, Tabs, Tab, Row, Col, Nav } from 'react-bootstrap'
import styles from './tab.module.scss'

export function ControlledTabs() {
  const [key, setKey] = useState('home')

  return (
    <Container>
      <Row>
        <Col>
          <Tabs defaultActiveKey='Home' id='controlled-tab-example'>
            <Tab eventKey='home' title='Home'>
              <div>asffafdasd</div>
            </Tab>
            <Tab eventKey='profile' title='Profile'>
              <div>sSsSas</div>
            </Tab>
            <Tab eventKey='contact' title='Contact'>
              <div>sSsSas asdae asd aasd asd asda sda sdas das dasd asd asd a sda sdas da</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}
