import React from 'react';

export default class Piece extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            hasMoved: false,
            isWhite: props.isWhite
        }
    }
}