package model

import (
	"errors"
	"gorm.io/gorm"
)

type Card struct {
	Model
	ViewID uint    `json:"vid" gorm:"index" binding:"required"`
	Sort   uint    `json:"sort" grom:"index"`
	Name   *string `json:"name"`
	Data   []byte  `json:"data"`
	LinkID *uint   `json:"link,omitempty"`
	Link   *Card   `json:"-"`
}

func (c *Card) BeforeCreate(tx *gorm.DB) error {
	var temp Card
	if c.Sort != 0 {
		return nil
	}
	err := tx.Order("sort desc").Where("view_id = ?", c.ViewID).Take(&temp).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.Sort = 1
			return nil
		}
	} else {
		c.Sort = temp.Sort + 1
	}
	return err
}

func (c *Card) AfterFind(tx *gorm.DB) (err error) {
	if c.LinkID != nil {
		var temp Card
		temp.LinkID = c.LinkID
		err := tx.Where("id = ?", temp.LinkID).Take(&temp).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return &ErrEmptyLink{Card: c}
			} else {
				return err
			}
		}
		c.Data = temp.Data
		if c.Name == nil {
			c.Name = temp.Name
		}
	}
	return
}
