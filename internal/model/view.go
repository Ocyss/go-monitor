package model

import (
	"errors"
	"gorm.io/gorm"
)

type View struct {
	Model
	Name  string `json:"name" gorm:"not null"`
	Path  string `json:"path" gorm:"not null;uniqueIndex"`
	Sort  uint   `json:"sort" grom:"uniqueIndex"`
	Cards []Card `json:"cards,omitempty"`
}

func (v *View) BeforeCreate(tx *gorm.DB) error {
	var temp View
	if v.Sort != 0 {
		return nil
	}
	err := tx.Order("sort desc").Take(&temp).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			v.Sort = 1
			return nil
		}
	} else {
		v.Sort = temp.Sort + 1
	}
	return err
}
