package model

import (
	"gorm.io/gorm"
)

type Model struct {
	ID        uint `json:"id" gorm:"primarykey" `
	CreatedAt int  `json:"created_at"`
	UpdatedAt int  `json:"updated_at,omitempty"`
}

func (m *Model) AfterFind(tx *gorm.DB) (err error) {
	if m.CreatedAt == m.UpdatedAt {
		m.UpdatedAt = 0
	}
	return
}
