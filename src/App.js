import './styles/App.scss'
import { createMuiTheme, responsiveFontSizes, ThemeProvider, withStyles } from '@material-ui/core/styles'

import { CssBaseline, Container, Box, Paper, Button, Switch } from "@material-ui/core"

import PersonIcon from '@material-ui/icons/Person'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'

import Player from "./Player"
import Pawn from './Pieces/Pawn'
import Bishop from './Pieces/Bishop'
import Horse from './Pieces/Horse'
import King from './Pieces/King'
import Queen from './Pieces/Queen'
import Tower from './Pieces/Tower'

import React from 'react'

const styles = theme => ({
    tile: {
        display: "flex",
        width: "100%",
        maxWidth: "100px",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: "1",
        fontSize: "4rem",
        "&:after": {
            content: "''",
            display: "table",
            paddingTop: "100%",
        },
    },
    lightTile: {
        backgroundColor: "#efedd1"
    },
    darkTile: {
        backgroundColor: "#789656"
    },
    chessContainer: {
        width: "800px"
    }
})

class App extends React.Component
{
    constructor(props)
    {
        super(props)

        this.theme = createMuiTheme()
        this.theme = responsiveFontSizes(this.theme)

        this.tiles = new Array(8)

        for (var i = 0; i < 8; i++)
        {
            this.tiles[i] = new Array(8)
        }

        this.state = {
            whitePlayer: new Player({isWhite: true, onTurn: true}),
            blackPlayer: new Player({isWhite: false, onTurn: false}),
            gameStarted: false,
            tiles: this.tiles
        }
    }

    startGame()
    {
        // Black Player
        for (var i = 0; i < 8; i++)
        {
            this.tiles[1][i] = <Pawn isWhite={this.state.blackPlayer.state.isWhite}/>
        }

        this.tiles[0][0] = <Tower isWhite={this.state.blackPlayer.state.isWhite}/>
        this.tiles[0][7] = <Tower isWhite={this.state.blackPlayer.state.isWhite}/>

        this.tiles[0][1] = <Horse isWhite={this.state.blackPlayer.state.isWhite}/>
        this.tiles[0][6] = <Horse isWhite={this.state.blackPlayer.state.isWhite}/>

        this.tiles[0][2] = <Bishop isWhite={this.state.blackPlayer.state.isWhite}/>
        this.tiles[0][5] = <Bishop isWhite={this.state.blackPlayer.state.isWhite}/>

        this.tiles[0][3] = <Queen isWhite={this.state.blackPlayer.state.isWhite}/>
        this.tiles[0][4] = <King isWhite={this.state.blackPlayer.state.isWhite}/>

        // White Player
        for (i = 0; i < 8; i++)
        {
            this.tiles[6][i] = <Pawn isWhite={this.state.whitePlayer.state.isWhite}/>
        }

        this.tiles[7][0] = <Tower isWhite={this.state.whitePlayer.state.isWhite}/>
        this.tiles[7][7] = <Tower isWhite={this.state.whitePlayer.state.isWhite}/>

        this.tiles[7][1] = <Horse isWhite={this.state.whitePlayer.state.isWhite}/>
        this.tiles[7][6] = <Horse isWhite={this.state.whitePlayer.state.isWhite}/>

        this.tiles[7][2] = <Bishop isWhite={this.state.whitePlayer.state.isWhite}/>
        this.tiles[7][5] = <Bishop isWhite={this.state.whitePlayer.state.isWhite}/>

        this.tiles[7][3] = <Queen isWhite={this.state.whitePlayer.state.isWhite}/>
        this.tiles[7][4] = <King isWhite={this.state.whitePlayer.state.isWhite}/>

        let tState = this.state
        tState.gameStarted = true
        this.setState(tState)
    }

    handleMove(rowIndex, cellIndex)
    {
        console.log(this.tiles[rowIndex][cellIndex])
    }

    render()
    {
        const { classes } = this.props
        console.log("render")

        return (
            <>
                <CssBaseline/>
                <ThemeProvider theme={this.theme}>
                    <Box marginTop={3}>
                        <Container maxWidth="md">
                            <Box display="block" textAlign="center">
                                <Button disabled={this.state.gameStarted ? true : false} variant="contained" color="primary" onClick={() => {this.startGame()}}>PLAY</Button>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" position="relative">
                                <Box className={classes.chessContainer} marginTop={2} margin="0 auto">
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((row, rowIndex) => (
                                        <Box key={rowIndex} display="flex">
                                            {[0, 1, 2, 3, 4, 5, 6, 7].map((cell, cellIndex) => (
                                                <Paper key={`${rowIndex}${cellIndex}`} className={`${classes.tile} ${(rowIndex + cellIndex) % 2 ? classes.lightTile : classes.darkTile}`} variant="outlined" square onClick={() => {this.handleMove(rowIndex, cellIndex)}}>{this.state.tiles[rowIndex][cellIndex]}</Paper>
                                            ))}
                                        </Box>
                                    ))}
                                </Box>
                                <Box display="flex" position="absolute" right="-110px">
                                    <PersonIcon fontSize="large" />
                                    <Switch checked={this.state.blackPlayer.state.onTurn ? true : false} disabled color="default"/>
                                    <PersonOutlineIcon fontSize="large" />
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </ThemeProvider>
            </>
        )
    }
}

export default withStyles(styles)(App)
