package db

import (
	"github.com/Ocyss/go-monitor/internal/model"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init(d *gorm.DB) {
	db = d
	err := db.AutoMigrate(model.View{}, model.Card{})
	if err != nil {
		log.Fatalf("Database automatic migration failed: %s", err.Error())
	}
}

func GetDb() *gorm.DB {
	return db
}
