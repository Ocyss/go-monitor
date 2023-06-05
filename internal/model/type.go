package model

import "fmt"

type ErrEmptyLink struct {
	Card *Card
}

func (e *ErrEmptyLink) Error() string {
	return fmt.Sprintf("CardId:%d having an incorrect link", e.Card.ID)
}
