package db

import "github.com/Ocyss/go-monitor/internal/model"

func CardAdd(data *model.Card) error {
	return db.Create(data).Error
}
