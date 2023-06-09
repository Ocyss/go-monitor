package bootstrap

import (
	"fmt"
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/Ocyss/go-monitor/internal/conf"
	"github.com/Ocyss/go-monitor/internal/db"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	stdlog "log"
	"strings"
	"time"
)

func InitDb() {
	var dialector gorm.Dialector
	var dB *gorm.DB
	var err error
	if flags.Memory {
		dialector = sqlite.Open("file::memory:?cache=shared")
	} else {
		database := conf.Conf.Database
		switch strings.ToUpper(database.Type) {
		case "SQLITE3":
			dialector = sqlite.Open(fmt.Sprintf("%s?_journal=WAL&_vacuum=incremental",
				database.DbFile))
		case "MYSQL":
			dialector = mysql.Open(fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
				database.User, database.Password, database.Host, database.Port, database.Name))
		case "POSTGRES":
			dialector = postgres.Open(fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Asia/Shanghai",
				database.Host, database.User, database.Password, database.Name, database.Port))
		default:
			log.Fatalf("not supported database type: %s,supported:[sqlite3,mysql,postgres]", database.Type)
		}
	}
	logLevel := logger.Silent
	if flags.Debug || flags.Dev {
		logLevel = logger.Info
	}
	dB, err = gorm.Open(dialector, &gorm.Config{
		Logger: logger.New(
			stdlog.New(log.StandardLogger().Out, "\r\n", stdlog.LstdFlags),
			logger.Config{
				SlowThreshold:             time.Second,
				LogLevel:                  logLevel,
				IgnoreRecordNotFoundError: true,
				Colorful:                  true,
			},
		),
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		TranslateError: true,
	})
	if err != nil {
		log.Fatalf("Unable to connect to database:%s", err.Error())
	}
	db.Init(dB)
}
