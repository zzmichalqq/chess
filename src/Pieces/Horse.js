import Piece from "./Piece"

export default class Horse extends Piece
{
    constructor(props)
    {
        super(props)

        this.state = props
    }

    render()
    {
        return this.state.isWhite ? "♘" : "♞"
    }
}