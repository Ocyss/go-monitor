package db

import (
	"github.com/Ocyss/go-monitor/internal/model"
	"gorm.io/gorm"
)

func ViewAdd(data *model.View) error {
	return db.Create(&data).Error
}

func ViewGets() ([]model.View, error) {
	var data []model.View
	err := db.Order("sort asc").Find(&data).Error
	return data, err
}

func ViewGet(id uint) (*model.View, error) {
	var data model.View
	err := db.Preload("Cards", func(db *gorm.DB) *gorm.DB {
		return db.Order("card.sort")
	}).Order("view.sort").Where(&model.Model{ID: id}).Take(&data).Error
	return &data, err
}

func ViewCheck(id uint) bool {
	err := db.Where("id = ?", id).Take(&model.View{}).Error
	return err == nil
}
