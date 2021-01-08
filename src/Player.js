import React from 'react';

export default class Player extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            onTurn: props.onTurn,
            isWhite: props.isWhite
        }
    }
}