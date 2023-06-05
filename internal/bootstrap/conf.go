package bootstrap

import (
	"encoding/json"
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/Ocyss/go-monitor/internal/conf"
	"github.com/Ocyss/go-monitor/utils"
	log "github.com/sirupsen/logrus"
	"os"
	"path/filepath"
)

var configPath string

func InitConf() {
	configPath = filepath.Join(flags.DataDir, "config.json")
	// The configuration file does not exist, create a default configuration
	if !utils.Exists(configPath) {
		log.Error("Failed to open,try to create config.json.")
		basePath := filepath.Dir(configPath)
		err := os.MkdirAll(basePath, 0700)
		if err != nil {
			log.Fatalf("can't create folder, %s", err)
		}
		conf.Conf = conf.DefaultConfig()
		defaultData, _ := json.MarshalIndent(conf.Conf, "", "  ")
		err = os.WriteFile(configPath, defaultData, os.ModePerm)
		if err != nil {
			log.Fatalf("configuration file write error,please check,{%s}", err)
		}
		return
	}
	file, err := os.ReadFile(configPath)
	if err != nil {
		log.Fatalf("configuration read error, please check,{%s}", err)
	}
	err = json.Unmarshal(file, &conf.Conf)
	if err != nil {
		log.Fatalf("configuration file parsing error,please check,{%s}", err)
	}
}
