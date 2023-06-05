package db

import (
	"github.com/Ocyss/go-monitor/internal/model"
)

func ViewAdd(data *model.View) error {
	return db.Create(&data).Error
}

func ViewGets() ([]model.View, error) {
	var data []model.View
	err := db.Find(&data).Error
	return data, err
}

func ViewGet(id uint) (*model.View, error) {
	var data model.View
	err := db.Preload("Cards").Where("id = ?", id).Take(&data).Error
	return &data, err
}
