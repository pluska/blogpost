import React from 'react'
import {Title, Content} from './style'
import {Navbar} from '../Navbar'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../Themes'



const NotFoundPage = () => (
    
    <ThemeProvider theme={theme}>
    <Navbar></Navbar>
            <Content>
            <Title>Error 404</Title>
              Page not found, return home to start over
             </Content>
        </ThemeProvider>
    
)

export default NotFoundPage